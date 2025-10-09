# Data Schema

When this application is compiled it will take an input `data.csv` and transform it into `out/data.json` that is necessary for the
website. Below is the specification for the input `data.csv`.

There must be a file named `data.csv` in this folder with facial traits, body traits, personality trait, voice traits,
and weaponry trait in columns 2, 3, 4, 5, and 6 respectively. The first two rows will be skipped (so sentence structure
is hard coded). Any blank cell will be skipped without breaking anything.

The output `out/data.json` contains a `meta.data_scheme_version` field for future proofing.

## Example

```csv
Arcs,Hair & Facial Features,Body / Clothes / Accessory,Personality / Quirk,Voice / Vocal Quirk,Weaponry,
,"""they have...""","""they don...""","""they are...""","""their voice is...""","""they attack using...""",
East Blue,,,,,,
Romance Dawn,"a long, curved moustache",a captain's coat with red and gold accents,overly confident,exactly what you think a pirate would sound like,,
,"straight, crimson-red hair","a long, black cape draped over his shoulders",charismatic and easy-going,,,
,"a scar across the left eye in the shape of three, straight lines",a simple white shirt that is open at the collar,,,,
,a scar under the left eye,a straw hat,always hungry,loud and carefree, [in combat] always announcing their moves as they attack,arms that outstretch like rubber
,a scar above the right eye in the shape of an X,a red vest,has a perpetually cheerful grin,high-pitched and enthusiastic,cutlass,
,,a striped green shirt,,,flintlock pistol,
,a pair of red-tinted goggles,a very large and round physique,always seen with a large piece of meat,"a deep, booming voice with a carefree laugh",,
```
