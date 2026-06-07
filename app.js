const genres = [
  {
    name: "Chicago house",
    family: "House",
    bpm: "118-125",
    drums: "4/4 jack",
    energy: "Warm, direct",
    playlistQuery: "Chicago house classics playlist",
    tracks: ["Frankie Knuckles - Your Love", "Marshall Jefferson - Move Your Body", "Adonis - No Way Back", "Phuture - Acid Tracks", "Mr. Fingers - Can You Feel It"],
    explanation: "Chicago house is the root system for a huge part of club music. Listen for a steady four-on-the-floor kick, handclaps or snares on the backbeat, drum-machine swing, and short musical hooks that repeat until they become physical. For production, notice how little material is needed: a tough kick, a bassline, a chord stab, a vocal phrase, and careful muting can create a whole arrangement."
  },
  {
    name: "Deep house",
    family: "House",
    bpm: "116-124",
    drums: "4/4, soft swing",
    energy: "Smooth, late-night",
    playlistQuery: "deep house classics playlist",
    tracks: ["Larry Heard - Mystery of Love", "Kerri Chandler - Atmosphere", "Moodymann - Shades of Jae", "Theo Parrish - Falling Up", "Chez Damier - Can You Feel It"],
    explanation: "Deep house keeps the house pulse but turns the lights down. Chords, pads, soulful fragments, and warm basslines matter as much as the drums. Listen for long decay times, subtle filter movement, and a feeling of emotional patience. In production, this is a good place to practice chord voicing, gentle saturation, and arrangements that evolve by small changes rather than big drops."
  },
  {
    name: "Acid house",
    family: "House",
    bpm: "120-128",
    drums: "4/4, machine groove",
    energy: "Squirming, ecstatic",
    playlistQuery: "acid house classics playlist",
    tracks: ["Phuture - Acid Tracks", "Sleezy D - I've Lost Control", "Armando - Land of Confusion", "A Guy Called Gerald - Voodoo Ray", "Hardfloor - Acperience 1"],
    explanation: "Acid house is built around the rubbery squelch of the Roland TB-303. The important thing is movement: cutoff, resonance, accent, slide, and pattern length turn one bassline into a living creature. Listen for how the acid line changes tension over time. For Reaktor, this is a perfect exercise in sequencing a simple synth voice and automating filter behavior."
  },
  {
    name: "Garage house",
    family: "House",
    bpm: "120-126",
    drums: "4/4, vocal swing",
    energy: "Soulful, buoyant",
    playlistQuery: "garage house classics playlist",
    tracks: ["Todd Terry - Can You Party", "Masters At Work - To Be In Love", "Barbara Tucker - Beautiful People", "Mood II Swing - Do It Your Way", "Blaze - Lovelee Dae"],
    explanation: "Garage house comes from the soulful side of club culture, with gospel-influenced vocals, swinging percussion, and basslines that make the groove feel human. Listen to how vocal phrases are arranged like hooks and how the drums push forward without becoming harsh. In production, study the relationship between the bass, piano or organ stabs, and vocal call-and-response."
  },
  {
    name: "French house",
    family: "House",
    bpm: "120-128",
    drums: "4/4, filtered disco",
    energy: "Glossy, celebratory",
    playlistQuery: "French house classics playlist",
    tracks: ["Daft Punk - Around the World", "Stardust - Music Sounds Better With You", "Cassius - 1999", "Alan Braxe & Fred Falke - Intro", "Modjo - Lady"],
    explanation: "French house is sample-driven, compressed, and euphoric, often built from disco loops that are filtered, chopped, and pushed hard into the mix bus. Listen for the dramatic opening and closing of filters, sidechain-like pumping, and tiny loop variations. For production, this teaches how arrangement can come from revealing and concealing the same sample."
  },
  {
    name: "Microhouse",
    family: "House",
    bpm: "118-126",
    drums: "Tiny, clipped swing",
    energy: "Detailed, minimal",
    playlistQuery: "microhouse playlist",
    tracks: ["Akufen - Deck the House", "Luomo - Tessio", "Isolée - Beau Mot Plage", "Ricardo Villalobos - Dexter", "Jan Jelinek - Tendency"],
    explanation: "Microhouse reduces house to clicks, fragments, small samples, and understated bass motion. It can feel dry at first, but the detail is the point. Listen for tiny edits, ghost percussion, and how silence becomes part of the groove. In Reaktor or Maschine, this is a brilliant style for learning sample chopping, probability, and small rhythmic offsets."
  },
  {
    name: "Minimal house",
    family: "House",
    bpm: "120-128",
    drums: "Lean 4/4",
    energy: "Restrained, rolling",
    playlistQuery: "minimal house playlist",
    tracks: ["DBX - Losing Control", "Matthew Dear - Dog Days", "Zip - The Essence", "Perlon records minimal house playlist", "Baby Ford - Dead Eye"],
    explanation: "Minimal house is about control. The kick is steady, the parts are few, and the groove depends on microtiming, percussion placement, and patient automation. Listen for what is left out. For production, try making a full minute with only kick, bass, hat, one percussive sound, and one tonal stab, then automate one parameter slowly."
  },
  {
    name: "Tech house",
    family: "House / Techno",
    bpm: "124-130",
    drums: "4/4, chunky",
    energy: "Functional, driving",
    playlistQuery: "classic tech house playlist",
    tracks: ["Mr. G - Daily Prayer", "Terry Francis - Took From Me", "Peace Division - Blacklight Sleaze", "Bushwacka! - Healer", "Nathan Coles - Burning Remixes"],
    explanation: "Tech house sits between house swing and techno efficiency. The best versions are stripped, bass-led, and built for long mixing. Listen for percussion loops, short vocal cuts, and basslines that leave room for the kick. Production-wise, it is useful for learning club utility: clean low end, tidy arrangement, and sections a DJ can mix."
  },
  {
    name: "Afro house",
    family: "House",
    bpm: "118-124",
    drums: "Polyrhythmic 4/4",
    energy: "Earthy, expansive",
    playlistQuery: "Afro house playlist",
    tracks: ["Black Coffee - Superman", "Culoe De Song - Y.O.U.D.", "Osunlade - Envision", "Da Capo - Speed of Sound", "Shimza - Congo Congo"],
    explanation: "Afro house keeps a house pulse but layers percussion in interlocking patterns. The groove often comes from shakers, bells, toms, and call-and-response melodies as much as from the kick. Listen for circular motion and long, spacious arrangements. For production, pay close attention to where each percussion part sits in the stereo field and frequency range."
  },
  {
    name: "Amapiano",
    family: "South African club",
    bpm: "110-115",
    drums: "Log drum shuffle",
    energy: "Loose, rolling",
    playlistQuery: "amapiano essentials playlist",
    tracks: ["Kabza De Small - Sponono", "DJ Maphorisa & Kabza De Small - Emcimbini", "Vigro Deep - Untold Stories", "Focalistic - Ke Star", "MFR Souls - Love You Tonight"],
    explanation: "Amapiano is slower than much club music, but the rhythm is deeply propulsive. The signature is the log drum: a tuned, sliding low percussion sound that acts like both bass and drum. Listen for spacious piano chords, shakers, and off-grid feeling. In production, study how the low end talks back to the percussion rather than simply following the kick."
  },
  {
    name: "Detroit techno",
    family: "Techno",
    bpm: "125-135",
    drums: "4/4, elegant machine",
    energy: "Futurist, soulful",
    playlistQuery: "Detroit techno classics playlist",
    tracks: ["Model 500 - No UFO's", "Rhythim Is Rhythim - Strings of Life", "Inner City - Good Life", "Underground Resistance - Transition", "Carl Craig - At Les"],
    explanation: "Detroit techno connects machine rhythm with soul, futurism, and melody. Compared with harder techno, it often has more harmonic imagination and emotional lift. Listen for synth strings, chords, arpeggios, and a clean forward pulse. For production, this is a reminder that techno can be musical without becoming song-like."
  },
  {
    name: "Minimal techno",
    family: "Techno",
    bpm: "124-132",
    drums: "Sparse 4/4",
    energy: "Tense, precise",
    playlistQuery: "minimal techno classics playlist",
    tracks: ["Plastikman - Spastik", "Robert Hood - Minus", "Daniel Bell - Baby Judy", "Basic Channel - Phylyps Trak", "Sleeparchive - Elephant Island"],
    explanation: "Minimal techno narrows the palette until every sound has to earn its place. Repetition becomes a microscope: tiny parameter changes feel large because the track gives you space to hear them. Listen for stripped drums, short loops, and hypnotic edits. For Reaktor, try building a small percussion system with one or two modulated controls."
  },
  {
    name: "Dub techno",
    family: "Techno",
    bpm: "118-128",
    drums: "4/4, submerged",
    energy: "Deep, misty",
    playlistQuery: "dub techno classics playlist",
    tracks: ["Basic Channel - Quadrant Dub", "Maurizio - M4", "Deepchord - Vantage Isle", "Yagya - Rigning", "Fluxion - Multidirectional"],
    explanation: "Dub techno is techno under weather. Chords echo into space, filters blur the edges, and delays become part of the groove. Listen for the chord stab: short, textured, and sent into dub-style echo. Production-wise, this is perfect for learning send effects, feedback, reverb tails, and slow automation that changes the size of a room."
  },
  {
    name: "Hypnotic techno",
    family: "Techno",
    bpm: "128-138",
    drums: "4/4, looping pressure",
    energy: "Trance-inducing",
    playlistQuery: "hypnotic techno playlist",
    tracks: ["Donato Dozzy - Cassandra", "Dino Sabatini - Modulation A", "Claudio PRC - Clear Depths", "Mike Parker - Lustrations", "Luigi Tozzi - Deep Blue"],
    explanation: "Hypnotic techno is about staying with a loop until your attention changes. It often uses rolling low end, filtered noise, metallic percussion, and slow shifts in density. Listen for how the track avoids obvious drops while still evolving. In production, try using modulation rates that are not synced exactly to the bar, so the loop keeps changing shape."
  },
  {
    name: "Hardgroove techno",
    family: "Techno",
    bpm: "132-142",
    drums: "Looped funk",
    energy: "Fast, percussive",
    playlistQuery: "hardgroove techno playlist",
    tracks: ["Ben Sims - Manipulated", "Mark Broom - Raver", "The Advent - Bad Boy", "Cristian Varela - Your Body Experience", "DJ Shufflemaster - Slip Inside You"],
    explanation: "Hardgroove techno is fast, funky, and percussion-heavy. It borrows the loop logic of techno but keeps a body-moving bounce through shuffles, rides, toms, and stabs. Listen for the groove underneath the speed. For production, this is a strong lesson in layering percussion without cluttering the low mids."
  },
  {
    name: "Industrial techno",
    family: "Techno",
    bpm: "128-145",
    drums: "Distorted 4/4",
    energy: "Harsh, metallic",
    playlistQuery: "industrial techno playlist",
    tracks: ["Surgeon - Magneze", "Regis - Speak To Me", "Ancient Methods - Knights & Bishops", "Perc - Look What Your Love Has Done To Me", "Paula Temple - Gegen"],
    explanation: "Industrial techno emphasizes metal, distortion, impact, and tension. The drums can feel like machinery, and the atmosphere often uses noise, alarms, and abrasive texture. Listen for distortion that is controlled rather than merely loud. Production-wise, study parallel processing, clipped percussion, and how to leave space so harsh sounds still hit clearly."
  },
  {
    name: "Hard techno",
    family: "Techno",
    bpm: "140-155",
    drums: "Heavy 4/4",
    energy: "Relentless",
    playlistQuery: "hard techno playlist",
    tracks: ["Dax J - Escape the System", "999999999 - X0004000X", "I Hate Models - Daydream", "Klangkuenstler - Weltschmerz", "Alignment - Ever Gone"],
    explanation: "Hard techno is built for pressure: fast tempo, strong kicks, aggressive synths, and direct arrangement moves. Listen for the kick tail, because it often carries bass energy as much as the actual bassline. For production, be careful with headroom and low-end control. Loudness is a result of balance, not just turning everything up."
  },
  {
    name: "Acid techno",
    family: "Techno",
    bpm: "130-145",
    drums: "4/4 plus acid",
    energy: "Ravey, driving",
    playlistQuery: "acid techno classics playlist",
    tracks: ["Hardfloor - Acperience 1", "Emmanuel Top - Acid Phase", "Josh Wink - Higher State of Consciousness", "Chris Liberator - London Acid City", "A&E Dept - The Rabbit's Name Was"],
    explanation: "Acid techno brings the 303 line into a harder, faster techno frame. The acid pattern is not decoration; it is the track's nervous system. Listen for how resonance and cutoff create peaks without changing the notes much. In Reaktor, build or find an acid-style mono synth and automate it like a performer."
  },
  {
    name: "Ambient techno",
    family: "Techno / Ambient",
    bpm: "90-125",
    drums: "Soft pulse",
    energy: "Floating, patient",
    playlistQuery: "ambient techno classics playlist",
    tracks: ["The Orb - Little Fluffy Clouds", "B12 - Hall of Mirrors", "The Black Dog - Virtual", "Global Communication - 14:31", "Biosphere - Novelty Waves"],
    explanation: "Ambient techno keeps a link to club rhythm but opens a much wider sense of space. Pads, field-like textures, and melodic fragments can become more important than drum impact. Listen for depth: foreground pulse, middle atmosphere, distant events. For production, this is useful if you want your final track to feel electronic and immersive without being peak-time club music."
  },
  {
    name: "Electro",
    family: "Electro / Breaks",
    bpm: "120-135",
    drums: "Broken 808 funk",
    energy: "Robotic, funky",
    playlistQuery: "electro classics playlist",
    tracks: ["Afrika Bambaataa - Planet Rock", "Cybotron - Clear", "Hashim - Al-Naafiysh", "Drexciya - Black Sea", "Aux 88 - Direct Drive"],
    explanation: "Electro is machine funk. Instead of a straight house kick on every beat, it uses broken 808 patterns, syncopated snares, toms, and basslines that feel robotic but danceable. Listen for the relationship between kick, snare, and bass gaps. For production, electro is excellent for learning drum programming because the rhythm has to speak clearly."
  },
  {
    name: "Detroit electro",
    family: "Electro",
    bpm: "125-140",
    drums: "Sharp 808 breaks",
    energy: "Aquatic, futurist",
    playlistQuery: "Detroit electro Drexciya playlist",
    tracks: ["Drexciya - Wavejumper", "Dopplereffekt - Cellular Phone", "Aux 88 - My A.U.X. Mind", "DJ Stingray - Cytokines", "Ectomorph - Subsonic Vibrations"],
    explanation: "Detroit electro is colder, stranger, and more futurist than electro-pop. It often uses dry drum machines, eerie pads, tight basslines, and science-fiction imagery. Listen for how sparse the mix can be while still feeling complete. In production, focus on crisp envelopes, short reverbs, and bass rhythms that answer the kick instead of shadowing it."
  },
  {
    name: "Miami bass",
    family: "Electro / Bass",
    bpm: "125-140",
    drums: "808 breaks",
    energy: "Party, sub-heavy",
    playlistQuery: "Miami bass classics playlist",
    tracks: ["2 Live Crew - We Want Some Pussy", "Dynamix II - Just Give the DJ a Break", "Maggotron - Bass It", "Debonaire - Give It Up", "DJ Magic Mike - Drop the Bass"],
    explanation: "Miami bass is built around 808 drums, call-and-response vocals, and serious low end. It is direct, physical, and often intentionally outrageous. Listen for boom, space, and snare placement. For production, use it as a study in sub discipline: the bass can be huge because the arrangement gives it room."
  },
  {
    name: "Breakbeat",
    family: "Breaks",
    bpm: "125-140",
    drums: "Broken breaks",
    energy: "Bouncy, kinetic",
    playlistQuery: "breakbeat classics playlist",
    tracks: ["The Prodigy - No Good", "Plump DJs - Scram", "Rennie Pilgrem - A Place Called Acid", "Freestylers - B-Boy Stance", "Hybrid - Finished Symphony"],
    explanation: "Breakbeat replaces the steady four-on-the-floor drive with broken drum patterns. The groove comes from kicks and snares landing in syncopated places, often with chopped funk breaks or programmed variations. Listen for the push-pull feeling. Production-wise, this teaches you to make rhythm move without relying on a kick every beat."
  },
  {
    name: "Big beat",
    family: "Breaks",
    bpm: "110-135",
    drums: "Chunky breaks",
    energy: "Loud, festival",
    playlistQuery: "big beat classics playlist",
    tracks: ["The Chemical Brothers - Block Rockin' Beats", "Fatboy Slim - Right Here Right Now", "The Prodigy - Firestarter", "Propellerheads - Take California", "Basement Jaxx - Red Alert"],
    explanation: "Big beat is breakbeat made oversized: rock energy, big samples, loud drums, hooks, and obvious impact. It is less subtle than many club genres, which makes it useful to study arrangement. Listen for how sections announce themselves. In production, notice the contrast between filtered breakdowns, sample drops, and full drum returns."
  },
  {
    name: "Nu skool breaks",
    family: "Breaks",
    bpm: "130-140",
    drums: "Tight modern breaks",
    energy: "Clubby, polished",
    playlistQuery: "nu skool breaks playlist",
    tracks: ["Stanton Warriors - Da Antidote", "Plump DJs - Electric Disco", "Freestylers - Push Up", "Tayo - March of the Soundboy", "Ils - Next Level"],
    explanation: "Nu skool breaks updates breakbeat with cleaner production, heavier bass, and DJ-friendly structure. It often sits near tech house and electro in energy while keeping broken drums. Listen for polished low end and snare snap. For production, this is a good middle ground if you like club function but do not want straight 4/4."
  },
  {
    name: "UK garage",
    family: "UK club",
    bpm: "130-138",
    drums: "Swinging shuffle",
    energy: "Bubbly, elastic",
    playlistQuery: "UK garage classics playlist",
    tracks: ["Tina Moore - Never Gonna Let You Go", "Double 99 - RipGroove", "MJ Cole - Sincere", "187 Lockdown - Gunman", "Wookie - Battle"],
    explanation: "UK garage is all about swing. The drums skip and shuffle around the beat, vocals are chopped into hooks, and basslines bounce rather than simply roll. Listen for ghost notes and offbeat hats. In Maschine, try quantizing less aggressively and moving percussion slightly late or early until the groove starts to lean."
  },
  {
    name: "2-step garage",
    family: "UK club",
    bpm: "130-138",
    drums: "Broken shuffle",
    energy: "Slick, syncopated",
    playlistQuery: "2 step garage classics playlist",
    tracks: ["Artful Dodger - Re-Rewind", "Zed Bias - Neighbourhood", "El-B - Buck & Bury", "Horsepower Productions - Gorgon Sound", "Dem 2 - Destiny"],
    explanation: "2-step garage removes the regular four-kick pattern and turns garage into a more broken, syncopated form. The snare and kick leave gaps that the bass and vocal chops fill. Listen for negative space. Production-wise, this is a perfect exercise in making rhythm feel fast and danceable without constant drums."
  },
  {
    name: "Speed garage",
    family: "UK club",
    bpm: "130-138",
    drums: "Shuffle plus bass",
    energy: "Dark, bouncy",
    playlistQuery: "speed garage classics playlist",
    tracks: ["Double 99 - RipGroove", "Tuff Jam - Experience", "Industry Standard - What You Want", "RIP Productions - The Players", "Boris Dlugosch - Hold Your Head Up High"],
    explanation: "Speed garage takes house and garage swing, then adds darker bass pressure and more aggressive low-end movement. Listen for organ stabs, pitched vocals, and basslines that wobble before dubstep made that language famous. For production, study how the bass leaves enough gaps for the kick and snare to stay punchy."
  },
  {
    name: "Bassline",
    family: "UK club",
    bpm: "135-145",
    drums: "Garage-derived",
    energy: "Cheeky, heavy",
    playlistQuery: "UK bassline classics playlist",
    tracks: ["T2 - Heartbroken", "DJ Q - You Wot!", "TS7 - Smile", "Jamie Duggan - Moving", "Niche bassline classics playlist"],
    explanation: "Bassline is a rowdy UK descendant of garage, centered on playful, rubbery bass riffs and direct vocal hooks. The drums keep garage momentum, but the bass is the star. Listen for call-and-response between vocal and low end. Production-wise, this is useful for learning how to make a bass patch memorable, not just large."
  },
  {
    name: "Grime",
    family: "UK club / Rap",
    bpm: "135-145",
    drums: "Sparse squarewave pressure",
    energy: "Cold, confrontational",
    playlistQuery: "grime instrumentals classics playlist",
    tracks: ["Wiley - Eskimo", "Dizzee Rascal - I Luv U", "Ruff Sqwad - Functions on the Low", "Jammer - Destruction VIP", "Skepta - D.T.I."],
    explanation: "Grime is sparse, sharp, and tense. The instrumentals often use square waves, icy synths, unusual drum placement, and lots of room for MCs. Listen for how empty the beat can be while still feeling dangerous. For production, grime is a lesson in restraint: one ugly synth line and a few drums can be enough if the rhythm has attitude."
  },
  {
    name: "Dubstep",
    family: "Bass music",
    bpm: "138-142",
    drums: "Half-time weight",
    energy: "Dark, spacious",
    playlistQuery: "dubstep classics 2006 playlist",
    tracks: ["Skream - Midnight Request Line", "Digital Mystikz - Haunted", "Loefah - Midnight", "Benga - 26 Basslines", "Kode9 & The Spaceape - 9 Samurai"],
    explanation: "Early dubstep is about sub-bass, space, and half-time tension. The tempo may sit around 140, but the snare often makes it feel slower and heavier. Listen to the gaps as much as the hits. In production, this teaches sub design, sparse arrangement, and how reverb or delay can make a track feel huge without filling every frequency."
  },
  {
    name: "Post-dubstep",
    family: "Bass music",
    bpm: "125-140",
    drums: "Hybrid broken",
    energy: "Introspective, spacious",
    playlistQuery: "post dubstep playlist",
    tracks: ["Burial - Archangel", "Mount Kimbie - Carbonated", "James Blake - CMYK", "Joy Orbison - Hyph Mngo", "Pangaea - Router"],
    explanation: "Post-dubstep keeps the space and bass sensibility of dubstep but opens it toward song, garage, house, and experimental textures. Listen for crackle, vocal fragments, unusual swing, and melancholy harmony. Production-wise, it is a good style if you want emotional atmosphere and club DNA without a rigid genre template."
  },
  {
    name: "UK bass",
    family: "Bass music",
    bpm: "125-140",
    drums: "Hybrid club",
    energy: "Flexible, low-end led",
    playlistQuery: "UK bass music playlist",
    tracks: ["Pearson Sound - Blanked", "Peverelist - Roll With The Punches", "Objekt - Cactus", "Untold - Anaconda", "Hessle Audio playlist"],
    explanation: "UK bass is less a single genre than a meeting point for garage, dubstep, techno, breaks, and soundsystem pressure. The common feature is rhythmic invention and serious low end. Listen for unfamiliar drum grids and bass movement. For production, treat it as permission to build a club track from rhythm and sound design rather than from genre rules."
  },
  {
    name: "Jungle",
    family: "Drum & bass",
    bpm: "155-170",
    drums: "Chopped breaks",
    energy: "Ruff, euphoric",
    playlistQuery: "jungle classics playlist",
    tracks: ["Goldie - Inner City Life", "LTJ Bukem - Atlantis", "Shy FX - Original Nuttah", "Remarc - RIP", "Omni Trio - Renegade Snares"],
    explanation: "Jungle is built from chopped breakbeats, heavy bass, reggae and soundsystem influence, and wild rhythmic detail. The Amen break and similar drum breaks are sliced, rearranged, and accelerated. Listen for the contrast between frantic drums and deep bass. For production, this is about sample editing, break variation, and not letting the drums flatten into a loop."
  },
  {
    name: "Liquid drum & bass",
    family: "Drum & bass",
    bpm: "170-176",
    drums: "Rolling breaks",
    energy: "Smooth, emotional",
    playlistQuery: "liquid drum and bass playlist",
    tracks: ["High Contrast - Return of Forever", "Calibre - Even If", "Logistics - Together", "London Elektricity - Just One Second", "LTJ Bukem - Music"],
    explanation: "Liquid drum and bass uses fast breakbeats with warmer chords, vocals, pads, and melodic basslines. It can feel uplifting or melancholy while still moving quickly. Listen for how the drums roll continuously without dominating the harmony. In production, study sidechain, bass note length, and how pads are filtered so the mix stays clear at high tempo."
  },
  {
    name: "Neurofunk",
    family: "Drum & bass",
    bpm: "170-176",
    drums: "Tight, technical",
    energy: "Dark, engineered",
    playlistQuery: "neurofunk drum and bass playlist",
    tracks: ["Noisia - Stigma", "Ed Rush & Optical - Bacteria", "Black Sun Empire - Arrakis", "Phace - Cold Champagne", "Mefjus - Suicide Bassline"],
    explanation: "Neurofunk is drum and bass as precision engineering: complex bass design, tight drums, dark atmospheres, and aggressive mix control. Listen for basslines that mutate almost like lead instruments. For production, this is advanced sound design territory. Even if you do not make it, it teaches resampling, filtering, distortion, and microscopic editing."
  },
  {
    name: "Techstep",
    family: "Drum & bass",
    bpm: "165-175",
    drums: "Hard breaks",
    energy: "Dark, tactical",
    playlistQuery: "techstep drum and bass classics playlist",
    tracks: ["Ed Rush & Optical - Wormhole", "Doc Scott - Shadow Boxing", "Trace - Mutant Revisited", "Dillinja - The Angels Fell", "Dom & Roland - Can't Punish Me"],
    explanation: "Techstep made drum and bass darker, more mechanical, and more minimal. Compared with jungle, it often has colder atmospheres, heavier bass stabs, and less obvious rave euphoria. Listen for menace and restraint. In production, study how a few bass hits can define the whole track when the drum pattern is strong."
  },
  {
    name: "Footwork / juke",
    family: "Chicago club",
    bpm: "150-165",
    drums: "Rapid syncopation",
    energy: "Fractured, athletic",
    playlistQuery: "footwork juke classics playlist",
    tracks: ["DJ Rashad - I Don't Give a Fuck", "DJ Spinn - Bounce N Break Yo Back", "RP Boo - Baby Come On", "Traxman - Footworkin On Air", "DJ Nate - Hatas Our Motivation"],
    explanation: "Footwork and juke use fast tempos, repeated vocal cuts, sub hits, and extremely syncopated drum programming made for dance battles. The rhythm can feel unstable until your ear locks in. Listen for repetition as hypnosis and interruption. Production-wise, this is a great study in sample triggering, short phrases, and unconventional kick placement."
  },
  {
    name: "Trance",
    family: "Trance",
    bpm: "130-140",
    drums: "Driving 4/4",
    energy: "Euphoric, rising",
    playlistQuery: "classic trance playlist",
    tracks: ["Energy 52 - Cafe Del Mar", "Gouryella - Gouryella", "Binary Finary - 1998", "Paul van Dyk - For An Angel", "Sasha - Xpander"],
    explanation: "Trance is about lift, repetition, and emotional release. Arpeggios, supersaws, long breakdowns, and filter builds create a sense of ascent. Listen for tension over long time spans rather than only bar-to-bar groove. In production, trance teaches automation, harmonic pacing, and how to make a return feel earned."
  },
  {
    name: "Progressive trance",
    family: "Trance",
    bpm: "126-134",
    drums: "Rolling 4/4",
    energy: "Gradual, expansive",
    playlistQuery: "progressive trance classics playlist",
    tracks: ["Sasha - Xpander", "BT - Flaming June", "Breeder - Twilo Thunder", "Tilt - Invisible", "Bedrock - Heaven Scent"],
    explanation: "Progressive trance is trance with patience. It builds through layers, subtle melodic development, and long DJ-friendly arcs. Listen for how elements enter gradually and how the groove can stay grounded while the harmony opens up. Production-wise, this is useful if you want a full track that feels complete without relying on sudden drops."
  },
  {
    name: "Goa trance",
    family: "Trance",
    bpm: "135-150",
    drums: "Psychedelic 4/4",
    energy: "Spiraling, cosmic",
    playlistQuery: "Goa trance classics playlist",
    tracks: ["Hallucinogen - LSD", "Astral Projection - Mahadeva", "Man With No Name - Teleport", "Juno Reactor - Pistolero", "Green Nuns of the Revolution - Two Vindaloos"],
    explanation: "Goa trance is melodic, psychedelic, and densely patterned. Acidic lines, arps, eastern-tinged scales, and spiraling sequences layer over fast four-on-the-floor drums. Listen for counterpoint between multiple synth lines. For Reaktor, this is fertile territory for sequencers, randomization, and filter modulation."
  },
  {
    name: "Psytrance",
    family: "Trance",
    bpm: "138-148",
    drums: "Kick-bass engine",
    energy: "Driving, psychedelic",
    playlistQuery: "psytrance essentials playlist",
    tracks: ["Astrix - Deep Jungle Walk", "Ace Ventura - Presence", "Vini Vici - The Tribe", "Infected Mushroom - Becoming Insane", "Electric Universe - The Prayer"],
    explanation: "Psytrance runs on the kick-bass engine: a tight kick followed by a rolling bass pattern that locks the track into constant forward motion. Around it, synth sequences, sweeps, and psychedelic effects mutate. Listen for bass note length and how precisely it avoids the kick. Production-wise, this is a discipline in envelope shaping and low-end timing."
  },
  {
    name: "Hardcore",
    family: "Rave",
    bpm: "160-180",
    drums: "Fast rave breaks",
    energy: "Explosive",
    playlistQuery: "rave hardcore classics playlist",
    tracks: ["Altern-8 - Activ 8", "SL2 - On A Ragga Tip", "The Prodigy - Everybody in the Place", "Acen - Trip II The Moon", "DJ Seduction - Hardcore Heaven"],
    explanation: "Early hardcore rave is fast, sample-heavy, and ecstatic. Breakbeats, hoovers, piano stabs, sirens, and vocal snippets collide with a sense of urgency. Listen for collage energy. For production, it teaches arrangement by impact: rapid switches, obvious hooks, and high-contrast sections."
  },
  {
    name: "Gabber",
    family: "Hardcore",
    bpm: "160-200",
    drums: "Distorted kick",
    energy: "Brutal, ecstatic",
    playlistQuery: "gabber classics playlist",
    tracks: ["Rotterdam Terror Corps - Hardcore Motherfucker", "Neophyte - Braincracking", "The Prophet - Big Boys Don't Cry", "3 Steps Ahead - Drop It", "DJ Paul Elstak - Luv U More"],
    explanation: "Gabber centers on the distorted kick as both drum and bass. It is fast, blunt, and physically intense, but the best tracks still have groove and memorable riffs. Listen to the shape of the kick tail and how it creates pitch movement. Production-wise, this is a study in distortion, clipping, and keeping a brutal sound rhythmically readable."
  },
  {
    name: "Breakcore",
    family: "Hardcore / Experimental",
    bpm: "170-220",
    drums: "Extreme chopped breaks",
    energy: "Chaotic, hyper-detailed",
    playlistQuery: "breakcore classics playlist",
    tracks: ["Venetian Snares - Szamár Madár", "Shitmat - There's No Business Like Propa' Rungleclotted Mashup Bizznizz", "Bong-Ra - Bloodclot Techno", "Ruby My Dear - Croque Monsieur A Disneyland", "Igorrr - Tout Petit Moineau"],
    explanation: "Breakcore takes chopped breakbeats to an extreme: rapid edits, sudden switches, distortion, humor, and overload. It can be chaotic, but careful tracks have internal logic. Listen for editing density and contrast. For production, borrow the mindset rather than the whole speed: resample drums, cut them aggressively, and make variation part of the composition."
  },
  {
    name: "Ambient",
    family: "Ambient",
    bpm: "Any / none",
    drums: "Often absent",
    energy: "Suspended",
    playlistQuery: "ambient music essentials playlist",
    tracks: ["Brian Eno - An Ending (Ascent)", "Stars of the Lid - Requiem for Dying Mothers", "Aphex Twin - Rhubarb", "Hiroshi Yoshimura - Green", "Loscil - Endless Falls"],
    explanation: "Ambient shifts attention from beat and hook to texture, space, and time. Sounds may barely change, but their placement and tone matter deeply. Listen for foreground, background, and the emotional color of timbre. For Reaktor, ambient is ideal for drones, generative modulation, granular textures, and effects as composition."
  },
  {
    name: "Dark ambient",
    family: "Ambient",
    bpm: "Any / none",
    drums: "Rare, distant",
    energy: "Ominous, immersive",
    playlistQuery: "dark ambient essentials playlist",
    tracks: ["Lustmord - Heresy", "Biosphere - Substrata", "Raison d'être - The Empty Hollow Unfolds", "Atrium Carceri - Cellblock", "Thomas Köner - Permafrost"],
    explanation: "Dark ambient uses drones, low frequencies, field-like recordings, and long reverbs to create unease or vastness. There may be no beat, so motion comes from timbre and space. Listen for depth and tension. In production, study how filtering, noise, and reverb can imply a physical environment."
  },
  {
    name: "IDM",
    family: "Experimental electronic",
    bpm: "Any",
    drums: "Glitched, irregular",
    energy: "Brainy, playful",
    playlistQuery: "IDM classics playlist",
    tracks: ["Aphex Twin - Xtal", "Autechre - Bike", "Boards of Canada - Roygbiv", "Squarepusher - Beep Street", "Plaid - Eyen"],
    explanation: "IDM is a loose label for electronic music that foregrounds unusual rhythm, sound design, melody, and listening detail. It can be beautiful, awkward, funky, or abstract. Listen for rhythmic choices that would be odd in a standard club track but still feel intentional. Reaktor is especially suited to this world because systems and surprises can become musical material."
  },
  {
    name: "Downtempo / trip-hop",
    family: "Downtempo",
    bpm: "70-110",
    drums: "Slow breaks",
    energy: "Smoky, cinematic",
    playlistQuery: "downtempo trip hop classics playlist",
    tracks: ["Massive Attack - Teardrop", "Portishead - Glory Box", "DJ Shadow - Midnight in a Perfect World", "Thievery Corporation - Lebanese Blonde", "Bonobo - Kiara"],
    explanation: "Downtempo and trip-hop slow the breakbeat language down and focus on mood, sampling, bass, and atmosphere. Listen for dusty drums, cinematic harmony, and negative space. In production, this is useful if you want to practice sample layering, texture, and arrangement without the pressure of peak-time club energy."
  },
  {
    name: "Deconstructed club",
    family: "Experimental club",
    bpm: "Any",
    drums: "Fragmented club signals",
    energy: "Unstable, conceptual",
    playlistQuery: "deconstructed club playlist",
    tracks: ["Lotic - Heterocetera", "Arca - Thievery", "Amnesia Scanner - AS Chingy", "M.E.S.H. - Piteous Gate", "SOPHIE - Faceshopping"],
    explanation: "Deconstructed club takes familiar club sounds and breaks their expected functions. Kicks, snares, risers, vocals, and bass may appear, but they behave strangely: interrupted, exaggerated, or placed in unstable structures. Listen for tension between dancefloor memory and abstraction. In production, use it as permission to question the grid while still using club vocabulary."
  }
];

const STORAGE_KEY = "electronic-genre-atlas-v1";
const todayKey = () => new Date().toLocaleDateString("sv-SE");
const ytmSearch = (query) => `https://music.youtube.com/search?q=${encodeURIComponent(query)}`;
const soundCloudSearch = (query) => `https://soundcloud.com/search?q=${encodeURIComponent(query)}`;
const sourceConfig = {
  youtube: {
    label: "YouTube Music",
    linkText: "Open YouTube Music",
    note: "YouTube Music is usually better for canonical tracks and familiar artist/title searches.",
    search: ytmSearch
  },
  soundcloud: {
    label: "SoundCloud",
    linkText: "Open SoundCloud",
    note: "SoundCloud is often better for DJ sets, current scenes, edits, labels, and rougher crate-digging.",
    search: soundCloudSearch
  }
};

const exploreGroups = [
  { name: "House", blurb: "Groove, swing, vocals, chords", indices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { name: "Techno", blurb: "Machine rhythm, pressure, hypnosis", indices: [10, 11, 12, 13, 14, 15, 16, 17, 18] },
  { name: "Electro & Breaks", blurb: "Broken drums, 808s, syncopation", indices: [19, 20, 21, 22, 23, 24] },
  { name: "UK Club & Bass", blurb: "Shuffle, sub, soundsystem weight", indices: [25, 26, 27, 28, 29, 30, 31, 32] },
  { name: "Drum & Bass", blurb: "Fast breaks, bass pressure, edits", indices: [33, 34, 35, 36, 37] },
  { name: "Trance & Rave", blurb: "Lift, speed, euphoria, intensity", indices: [38, 39, 40, 41, 42, 43, 44] },
  { name: "Ambient & Experimental", blurb: "Texture, space, abstraction", indices: [45, 46, 47, 48, 49] }
];

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function trackAnalysis(track, genre) {
  return `Listen for ${genre.drums.toLowerCase()}, ${genre.energy.toLowerCase()} energy, and the arrangement choices that make it read as ${genre.name}.`;
}

const els = {
  title: document.querySelector("#genre-title"),
  family: document.querySelector("#genre-family"),
  dayCount: document.querySelector("#day-count"),
  progress: document.querySelector("#path-progress"),
  bpm: document.querySelector("#bpm"),
  drums: document.querySelector("#drums"),
  energy: document.querySelector("#energy"),
  explanation: document.querySelector("#explanation"),
  speak: document.querySelector("#speak"),
  stopSpeech: document.querySelector("#stop-speech"),
  guidedSession: document.querySelector("#guided-session"),
  speechStatus: document.querySelector("#speech-status"),
  playlistLink: document.querySelector("#playlist-link"),
  sourceNote: document.querySelector("#source-note"),
  sourceButtons: document.querySelectorAll(".source-button"),
  tracks: document.querySelector("#tracks"),
  notes: document.querySelector("#notes"),
  listened: document.querySelector("#listened"),
  rating: document.querySelector("#rating"),
  saveStatus: document.querySelector("#save-status"),
  completion: document.querySelector("#completion-message"),
  prompts: document.querySelectorAll(".prompt-chip"),
  path: document.querySelector("#path-list"),
  unlockStatus: document.querySelector("#unlock-status"),
  familyGrid: document.querySelector("#family-grid"),
  subgenreGrid: document.querySelector("#subgenre-grid"),
  returnCurrent: document.querySelector("#return-current"),
  tasteSummary: document.querySelector("#taste-summary"),
  reset: document.querySelector("#reset")
};

let state = loadState();
let viewingIndex = state.currentIndex;
let saveTimer = 0;

function loadState() {
  const fallback = {
    startedOn: todayKey(),
    currentIndex: 0,
    currentUnlockedOn: todayKey(),
    entries: {},
    source: "youtube",
    activeExploreGroup: "House"
  };

  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed || typeof parsed !== "object") return fallback;
    return {
      ...fallback,
      ...parsed,
      entries: parsed.entries && typeof parsed.entries === "object" ? parsed.entries : {}
    };
  } catch {
    return fallback;
  }
}

function saveState(instant = false) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  clearTimeout(saveTimer);

  if (instant) {
    els.saveStatus.textContent = "Saved";
    return;
  }

  els.saveStatus.textContent = "Saving...";
  saveTimer = window.setTimeout(() => {
    els.saveStatus.textContent = "Saved";
  }, 220);
}

function getEntry(index) {
  if (!state.entries[index]) {
    state.entries[index] = {
      notes: "",
      listened: false,
      completedOn: "",
      playlistOpened: false,
      rating: 0
    };
  }
  if (typeof state.entries[index].rating !== "number") {
    state.entries[index].rating = 0;
  }
  return state.entries[index];
}

function entryComplete(index) {
  const entry = getEntry(index);
  return entry.listened && entry.notes.trim().length > 0;
}

function advanceIfEligible() {
  const today = todayKey();
  if (
    state.currentIndex < genres.length - 1 &&
    entryComplete(state.currentIndex) &&
    state.currentUnlockedOn < today
  ) {
    state.currentIndex += 1;
    state.currentUnlockedOn = today;
    viewingIndex = state.currentIndex;
    saveState(true);
  }
}

function render() {
  advanceIfEligible();

  const genre = genres[viewingIndex];
  const entry = getEntry(viewingIndex);
  const isCurrent = viewingIndex === state.currentIndex;
  const isOffPath = viewingIndex > state.currentIndex;
  const source = sourceConfig[state.source] || sourceConfig.youtube;

  els.title.textContent = genre.name;
  els.family.textContent = `${genre.family} family`;
  els.dayCount.textContent = `Day ${state.currentIndex + 1} of ${genres.length}`;
  els.progress.value = state.currentIndex + 1;
  els.bpm.textContent = genre.bpm;
  els.drums.textContent = genre.drums;
  els.energy.textContent = genre.energy;
  els.explanation.textContent = genre.explanation;
  els.playlistLink.href = source.search(genre.playlistQuery);
  els.playlistLink.textContent = source.linkText;
  els.sourceNote.textContent = source.note;
  els.notes.value = entry.notes;
  els.listened.checked = entry.listened;
  els.notes.disabled = false;
  els.listened.disabled = false;
  els.speak.disabled = false;
  els.guidedSession.disabled = false;
  els.stopSpeech.disabled = false;

  els.tracks.innerHTML = genre.tracks
    .map((track) => `
      <li>
        <a href="${source.search(track)}" target="_blank" rel="noreferrer">${escapeHTML(track)}</a>
        <small>${escapeHTML(trackAnalysis(track, genre))}</small>
      </li>
    `)
    .join("");

  renderSourceButtons();
  renderRating(entry.rating, false);
  renderCompletion(isCurrent, isOffPath);
  renderPath();
  renderExplore();
  renderTasteSummary();
}

function renderCompletion(isCurrent, isOffPath) {
  const complete = entryComplete(viewingIndex);
  const today = todayKey();

  if (isOffPath) {
    els.completion.textContent = complete
      ? "Optional exploration saved. This will not skip the daily path."
      : "Optional exploration: you can listen and take notes here, but today still stays on the main path.";
  } else if (!complete) {
    els.completion.textContent = "To finish today, mark the listening session and write at least one note. The next genre will wait until a later day.";
  } else if (isCurrent && state.currentUnlockedOn === today) {
    els.completion.textContent = "Today is complete. The next genre can unlock tomorrow, so your ears get one clean focus at a time.";
  } else if (isCurrent) {
    els.completion.textContent = "This is complete. Reloading or returning now will unlock the next genre.";
  } else {
    els.completion.textContent = "Completed. You can revisit and add notes anytime.";
  }

  const currentComplete = entryComplete(state.currentIndex);
  if (state.currentIndex >= genres.length - 1 && currentComplete) {
    els.unlockStatus.textContent = "Path complete. You made it through all 50 genres.";
  } else if (currentComplete) {
    els.unlockStatus.textContent = state.currentUnlockedOn === today
      ? "Next unlock: tomorrow after today remains complete."
      : "Next unlock: available now. Refresh or revisit to advance one step.";
  } else {
    els.unlockStatus.textContent = "Next unlock: after listening is marked and notes are written.";
  }
}

function renderPath() {
  els.path.innerHTML = genres
    .map((genre, index) => {
      const locked = index > state.currentIndex;
      const complete = entryComplete(index);
      const current = index === state.currentIndex;
      const rating = getEntry(index).rating;
      const className = [
        "path-item",
        locked ? "is-locked" : "",
        complete ? "is-complete" : "",
        current ? "is-current" : ""
      ].filter(Boolean).join(" ");
      const stateLabel = locked ? "Locked" : complete ? "Done" : current ? "Now" : "Open";
      const ratingLabel = rating ? ` · ${"★".repeat(rating)}` : "";

      return `
        <li class="${className}">
          <button class="path-button ${current ? "is-current" : ""}" type="button" data-index="${index}" ${locked ? "disabled" : ""}>
            <span class="path-number">${String(index + 1).padStart(2, "0")}</span>
            <span>
              <span class="path-name">${genre.name}</span>
              <span class="path-family">${genre.family}</span>
            </span>
            <span class="path-state">${stateLabel}${ratingLabel}</span>
          </button>
        </li>
      `;
    })
    .join("");
}

function renderSourceButtons() {
  els.sourceButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.source === state.source);
  });
}

function renderRating(rating, isLocked) {
  els.rating.innerHTML = [1, 2, 3, 4, 5]
    .map((value) => `
      <button
        class="rating-button ${value <= rating ? "is-lit" : ""} ${value === rating ? "is-active" : ""}"
        type="button"
        role="radio"
        aria-checked="${value === rating}"
        aria-label="${value} out of 5"
        data-rating="${value}"
        ${isLocked ? "disabled" : ""}
      >★</button>
    `)
    .join("");
}

function renderExplore() {
  const activeGroup = exploreGroups.find((group) => group.name === state.activeExploreGroup) || exploreGroups[0];

  els.familyGrid.innerHTML = exploreGroups
    .map((group) => `
      <button class="family-card ${group.name === activeGroup.name ? "is-active" : ""}" type="button" data-family="${escapeHTML(group.name)}">
        <strong>${escapeHTML(group.name)}</strong>
        <span>${escapeHTML(group.blurb)} · ${group.indices.length} styles</span>
      </button>
    `)
    .join("");

  els.subgenreGrid.innerHTML = activeGroup.indices
    .map((index) => {
      const genre = genres[index];
      const locked = index > state.currentIndex;
      const rating = getEntry(index).rating;
      const status = locked ? "Locked in daily path, explorable here" : index === state.currentIndex ? "Today" : "Open";

      return `
        <button class="subgenre-card ${index === viewingIndex ? "is-current" : ""}" type="button" data-index="${index}">
          <strong>${escapeHTML(genre.name)}</strong>
          <span>${escapeHTML(genre.bpm)} · ${escapeHTML(genre.drums)} · ${status}${rating ? ` · ${"★".repeat(rating)}` : ""}</span>
        </button>
      `;
    })
    .join("");
}

function renderTasteSummary() {
  const rated = genres
    .map((genre, index) => ({ genre, index, rating: getEntry(index).rating }))
    .filter((item) => item.rating > 0)
    .sort((a, b) => b.rating - a.rating || a.index - b.index);

  if (!rated.length) {
    els.tasteSummary.innerHTML = '<p class="taste-empty">Rate genres as you go; your strongest pulls will collect here.</p>';
    return;
  }

  els.tasteSummary.innerHTML = rated
    .slice(0, 6)
    .map((item) => `
      <button class="taste-item" type="button" data-index="${item.index}">
        <strong>${escapeHTML(item.genre.name)}</strong>
        <span>${"★".repeat(item.rating)}</span>
      </button>
    `)
    .join("");
}

function updateCurrentEntry(patch) {
  const entry = getEntry(viewingIndex);
  Object.assign(entry, patch);

  if (entryComplete(viewingIndex) && !entry.completedOn) {
    entry.completedOn = todayKey();
  }

  saveState();
  renderCompletion(viewingIndex === state.currentIndex, viewingIndex > state.currentIndex);
  renderPath();
  renderRating(entry.rating, viewingIndex > state.currentIndex);
  renderExplore();
  renderTasteSummary();
}

els.notes.addEventListener("input", () => {
  updateCurrentEntry({ notes: els.notes.value });
});

els.listened.addEventListener("change", () => {
  updateCurrentEntry({ listened: els.listened.checked });
});

els.playlistLink.addEventListener("click", () => {
  updateCurrentEntry({ playlistOpened: true });
});

els.tracks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    updateCurrentEntry({ playlistOpened: true });
  }
});

els.sourceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.source = button.dataset.source;
    saveState(true);
    render();
  });
});

els.rating.addEventListener("click", (event) => {
  const button = event.target.closest(".rating-button");
  if (!button) return;
  const rating = Number(button.dataset.rating);
  const currentRating = getEntry(viewingIndex).rating;
  updateCurrentEntry({ rating: currentRating === rating ? 0 : rating });
});

els.path.addEventListener("click", (event) => {
  const button = event.target.closest(".path-button");
  if (!button || button.disabled) return;
  viewingIndex = Number(button.dataset.index);
  window.speechSynthesis.cancel();
  els.speechStatus.textContent = "";
  render();
});

els.familyGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".family-card");
  if (!button) return;
  state.activeExploreGroup = button.dataset.family;
  saveState(true);
  renderExplore();
});

els.subgenreGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".subgenre-card");
  if (!button) return;
  viewingIndex = Number(button.dataset.index);
  window.speechSynthesis.cancel();
  els.speechStatus.textContent = "";
  render();
  document.querySelector(".today-panel").scrollIntoView({ behavior: "smooth", block: "start" });
});

els.returnCurrent.addEventListener("click", () => {
  viewingIndex = state.currentIndex;
  window.speechSynthesis.cancel();
  els.speechStatus.textContent = "";
  render();
  document.querySelector(".today-panel").scrollIntoView({ behavior: "smooth", block: "start" });
});

els.tasteSummary.addEventListener("click", (event) => {
  const button = event.target.closest(".taste-item");
  if (!button) return;
  viewingIndex = Number(button.dataset.index);
  render();
});

function speakGenre({ openMusicAfter = false } = {}) {
  if (!("speechSynthesis" in window)) {
    els.speechStatus.textContent = "Speech is not available in this browser.";
    return;
  }

  window.speechSynthesis.cancel();
  els.speechStatus.textContent = "Preparing speech...";
  const genre = genres[viewingIndex];
  const utterance = new SpeechSynthesisUtterance(`${genre.name}. ${genre.explanation}`);
  utterance.rate = 0.94;
  utterance.pitch = 0.92;
  utterance.onstart = () => {
    els.speechStatus.textContent = "Speaking...";
  };
  utterance.onend = () => {
    if (!openMusicAfter) {
      els.speechStatus.textContent = "Speech finished.";
      return;
    }

    const source = sourceConfig[state.source] || sourceConfig.youtube;
    const musicWindow = window.open(source.search(genre.playlistQuery), "_blank", "noopener");
    els.speechStatus.textContent = musicWindow
      ? `Intro finished. Opening ${source.label}.`
      : `Intro finished. Use the ${source.linkText} button to start the music.`;
    updateCurrentEntry({ playlistOpened: true });
  };
  utterance.onerror = () => {
    els.speechStatus.textContent = "Speech could not start in this browser.";
  };
  window.speechSynthesis.speak(utterance);
}

els.speak.addEventListener("click", () => {
  speakGenre();
});

els.guidedSession.addEventListener("click", () => {
  els.speechStatus.textContent = "The intro will play first, then the selected music source opens.";
  speakGenre({ openMusicAfter: true });
});

els.stopSpeech.addEventListener("click", () => {
  window.speechSynthesis.cancel();
  els.speechStatus.textContent = "Speech stopped.";
});

els.prompts.forEach((button) => {
  button.addEventListener("click", () => {
    const prompt = button.dataset.prompt;
    const needsBreak = els.notes.value.trim().length > 0 && !els.notes.value.endsWith("\n");
    els.notes.value = `${els.notes.value}${needsBreak ? "\n\n" : ""}${prompt} `;
    els.notes.focus();
    els.notes.setSelectionRange(els.notes.value.length, els.notes.value.length);
    updateCurrentEntry({ notes: els.notes.value });
  });
});

els.reset.addEventListener("click", () => {
  const confirmed = window.confirm("Reset all listening progress and notes?");
  if (!confirmed) return;
  localStorage.removeItem(STORAGE_KEY);
  state = loadState();
  viewingIndex = state.currentIndex;
  window.speechSynthesis.cancel();
  render();
  saveState(true);
});

render();
