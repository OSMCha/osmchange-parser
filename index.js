import sax from "sax";

const TYPED_ATTRS = ["id", "uid", "changeset", "visible", "version", "lon", "lat"];

/*
 * Parse osmChange XML format documented here: https://wiki.openstreetmap.org/wiki/OsmChange
 * (Contains new versions of each modified element)
 */
function parseOsmChangeXML(xmlString) {
  return new Promise((resolve, reject) => {
    let parser = sax.parser(true /* strict mode */, { lowercase: true });

    let result = {};
    let action = null;
    let element = null;

    parser.onopentag = (node) => {
      let name = node.name, attrs = node.attributes;
      switch (name) {
        case "osmChange":
          Object.assign(result, attrs);
          break;
        case "create":
        case "modify":
        case "delete":
          result[name] ||= [];
          action = result[name];
          break;
        case "node":
        case "way":
        case "relation":
          element = attrs;
          element.type = name;
          element.tags ||= {};

          for (let attr of TYPED_ATTRS) {
            if (element[attr] !== undefined) {
              element[attr] = JSON.parse(element[attr]);
            }
          }

          if (name === "way") {
            element.nodes = [];
          }
          if (name === "relation") {
            element.members = [];
          }

          action.push(element);
          break;
        case "tag":
          element.tags[attrs.k] = attrs.v;
          break;
        case "nd":
          element.nodes.push(+attrs.ref);
          break;
        case "member":
          let { type, ref, role } = attrs;
          ref = +ref;
          element.members.push({ type, ref, role });
          break;
      }
    };

    parser.onend = () => resolve(result);
    parser.onerror = reject;

    parser.write(xmlString);
    parser.close();
  });
}

export default parseOsmChangeXML;
