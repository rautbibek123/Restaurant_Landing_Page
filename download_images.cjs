const https = require('https');
const fs = require('fs');
const path = require('path');

const download = (url, dest) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(dest);
  https.get(url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(resolve);
    });
  }).on('error', err => {
    fs.unlink(dest, () => {});
    reject(err);
  });
});

const images = {
  'hero_bg.jpg': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80',
  'momo.jpg': 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80',
  'jhol_momo.jpg': 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80',
  'choila.jpg': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
  'aloo_chop.jpg': 'https://images.unsplash.com/photo-1626202488338-750519db1d1a?w=600&q=80',
  'chatamari.jpg': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
  'dal_bhat.jpg': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80',
  'thakali.jpg': 'https://images.unsplash.com/photo-1548943487-a2e4d43b4850?w=600&q=80',
  'sekuwa.jpg': 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80',
  'saag_paneer.jpg': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
  'kwati.jpg': 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
  'juju_dhau.jpg': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80',
  'kheer.jpg': 'https://images.unsplash.com/photo-1517260739337-6799d239ce83?w=600&q=80',
  'sel_roti.jpg': 'https://images.unsplash.com/photo-1601000938259-9e92002320b2?w=600&q=80',
  'chai.jpg': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80',
  'tongba.jpg': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80',
  'lassi.jpg': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80'
};

const dir = path.join(__dirname, 'src', 'assets', 'images');

Promise.all(Object.entries(images).map(([name, url]) => {
  const dest = path.join(dir, name);
  console.log(`Downloading ${name}...`);
  return download(url, dest);
}))
.then(() => console.log('All images downloaded successfully.'))
.catch(err => console.error('Error downloading:', err));
