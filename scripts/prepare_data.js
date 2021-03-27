const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const sizeOf = require('image-size');

const pathOf = name => path.join(__dirname, '..', name);
const imagePath = (...names) =>
  pathOf(path.join('public/assets/images', ...names));

const name2id = title =>
  title
    .split(' ')
    .map(x => x.toLowerCase())
    .join('-');

const listImages = id =>
  fs
    .readdirSync(imagePath(id))
    .filter(x => !!x.match('.*(jpe?g|png)$'))
    .sort();

const parse = file => {
  const doc = yaml.load(fs.readFileSync(file, 'utf8'));

  const items = doc.items;
  const tags = Array.from(
    new Set(items.map(x => x.tags).flat(1))
  ).map(name => ({ id: name2id(name), name }));

  for (const item of items) {
    item.id = name2id(item.title);
    item.images = listImages(item.id).map(name => {
      const { height, width } = sizeOf(imagePath(item.id, name));
      return { name, width, height };
    });
  }

  return { items, tags };
};

try {
  const data = parse(pathOf('data.yaml'));
  fs.writeFileSync(pathOf('src/data.json'), JSON.stringify(data));
} catch (e) {
  console.error('Failed to build data', e);
  process.exit(1);
}
