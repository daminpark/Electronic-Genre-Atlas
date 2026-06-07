import tempfile
import unittest

from server import AtlasStore, merge_states


class MergeTests(unittest.TestCase):
    def test_merge_keeps_highest_progress_and_appends_conflicting_notes(self):
        cloud = {
            "currentIndex": 1,
            "currentUnlockedOn": "2026-06-01",
            "entries": {
                "0": {
                    "notes": "Mac note",
                    "productionNotes": "Mac production note",
                    "djNotes": "Mac DJ note",
                    "listened": True,
                    "completedOn": "2026-06-01",
                    "playlistOpened": False,
                    "rating": 2,
                }
            },
        }
        phone = {
            "currentIndex": 3,
            "currentUnlockedOn": "2026-06-04",
            "entries": {
                "0": {
                    "notes": "Phone note",
                    "productionNotes": "Phone production note",
                    "djNotes": "Phone DJ note",
                    "listened": False,
                    "completedOn": "2026-06-02",
                    "playlistOpened": True,
                    "rating": 5,
                }
            },
        }
        merged, summary = merge_states(cloud, phone, "iPhone")
        self.assertEqual(merged["currentIndex"], 3)
        self.assertTrue(merged["entries"]["0"]["listened"])
        self.assertTrue(merged["entries"]["0"]["playlistOpened"])
        self.assertEqual(merged["entries"]["0"]["completedOn"], "2026-06-01")
        self.assertEqual(merged["entries"]["0"]["rating"], 5)
        self.assertIn("Mac note", merged["entries"]["0"]["notes"])
        self.assertIn("Imported from iPhone", merged["entries"]["0"]["notes"])
        self.assertIn("Phone note", merged["entries"]["0"]["notes"])
        self.assertIn("Mac production note", merged["entries"]["0"]["productionNotes"])
        self.assertIn("Phone production note", merged["entries"]["0"]["productionNotes"])
        self.assertIn("Mac DJ note", merged["entries"]["0"]["djNotes"])
        self.assertIn("Phone DJ note", merged["entries"]["0"]["djNotes"])
        self.assertEqual(summary["notesAppended"], 3)
        self.assertEqual(summary["ratingsRaised"], 1)

    def test_idempotent_import(self):
        with tempfile.NamedTemporaryFile() as db:
            store = AtlasStore(db.name)
            store.get_or_create_user("pierre")
            state = {"currentIndex": 2, "entries": {"1": {"notes": "Mac", "rating": 4}}}
            rev1, synced1, summary1 = store.import_local("pierre", "same-import", "Mac", state)
            rev2, synced2, summary2 = store.import_local("pierre", "same-import", "Mac", state)
            self.assertEqual(rev1, rev2)
            self.assertEqual(synced1, synced2)
            self.assertEqual(summary1, summary2)

    def test_open_explore_groups_persist_and_can_be_empty(self):
        with tempfile.NamedTemporaryFile() as db:
            store = AtlasStore(db.name)
            store.get_or_create_user("pierre")
            revision, state = store.get_state("pierre")
            state["openExploreGroups"] = ["House", "Techno"]
            revision, synced, _ = store.put_state("pierre", revision, state)
            self.assertEqual(synced["openExploreGroups"], ["House", "Techno"])

            synced["openExploreGroups"] = []
            revision, synced, _ = store.put_state("pierre", revision, synced)
            self.assertEqual(synced["openExploreGroups"], [])

            stale_revision = revision
            synced["openExploreGroups"] = ["House"]
            revision, _, _ = store.put_state("pierre", revision, synced)
            synced["openExploreGroups"] = ["UK Club & Bass", "Drum & Bass"]
            _, stale_synced, _ = store.put_state("pierre", stale_revision, synced)
            self.assertEqual(stale_synced["openExploreGroups"], ["UK Club & Bass", "Drum & Bass"])


if __name__ == "__main__":
    unittest.main()
