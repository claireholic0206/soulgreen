const fs = require('fs');
const path = require('path');
const OpenCC = require('opencc-js');

const converter = OpenCC.Converter({ from: 'tw', to: 'cn' });

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      if (fullPath !== 'node_modules' && fullPath !== '.next' && fullPath !== '.git') {
        walkDir(fullPath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const converted = converter(content);
      fs.writeFileSync(fullPath, converted, 'utf8');
      console.log(`已轉換: ${fullPath}`);
    }
  });
}

walkDir('./src'); // 假設您的程式碼都在 src 目錄下