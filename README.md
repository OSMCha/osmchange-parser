# osmchange-parser

Parse OpenStreetMap OsmChange XML documents into plain JavaScript objects.

## Installation

```
npm install @osmcha/osmchange-parser
```

## Usage

```js
import parseOsmChangeXML from "@osmcha/osmchange-parser";
let changeset = await parseOsmChangeXML(xmlString);
```

## Example input & output

Input:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<osmChange version="0.6" generator="openstreetmap-cgimap 2.0.1 (1848 spike-07.openstreetmap.org)" copyright="OpenStreetMap and contributors" attribution="http://www.openstreetmap.org/copyright" license="http://opendatacommons.org/licenses/odbl/1-0/">
 <modify>
  <node id="2523603738" visible="true" version="3" changeset="155530622" timestamp="2024-08-20T21:36:16Z" user="jake-low" uid="8794039" lat="47.6647943" lon="-121.2881568">
   <tag k="highway" v="trailhead"/>
   <tag k="name" v="Necklace Valley Trailhead"/>
   <tag k="operator" v="US Forest Service"/>
   <tag k="website" v="https://www.fs.usda.gov/recarea/mbs/recarea/?recid=80228"/>
  </node>
 </modify>
</osmChange>
```

Output:

```json
{
  "version": "0.6",
  "generator": "openstreetmap-cgimap 2.0.1 (1848 spike-07.openstreetmap.org)",
  "copyright": "OpenStreetMap and contributors",
  "attribution": "http://www.openstreetmap.org/copyright",
  "license": "http://opendatacommons.org/licenses/odbl/1-0/",
  "modify": [
    {
      "id": 2523603738,
      "visible": true,
      "version": 3,
      "changeset": 155530622,
      "timestamp": "2024-08-20T21:36:16Z",
      "user": "jake-low",
      "uid": 8794039,
      "lat": 47.6647943,
      "lon": -121.2881568,
      "type": "node",
      "tags": {
        "highway": "trailhead",
        "name": "Necklace Valley Trailhead",
        "operator": "US Forest Service",
        "website": "https://www.fs.usda.gov/recarea/mbs/recarea/?recid=80228"
      }
    }
  ]
}
```
