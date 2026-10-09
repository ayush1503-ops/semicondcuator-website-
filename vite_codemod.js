const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walk(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

walk('src', (filepath) => {
  if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
    let content = fs.readFileSync(filepath, 'utf8');
    let changed = false;
    
    // Replace next/link
    if (content.includes('next/link')) {
      content = content.replace(/import Link from ['"]next\/link['"];?/g, 'import { Link } from "react-router-dom";');
      content = content.replace(/<Link\s+href=/g, '<Link to=');
      changed = true;
    }
    
    // Replace next/image
    if (content.includes('next/image')) {
      content = content.replace(/import Image from ['"]next\/image['"];?/g, '');
      content = content.replace(/<Image/g, '<img');
      changed = true;
    }
    
    // Remove "use client"
    if (content.includes('"use client"') || content.includes("'use client'")) {
       content = content.replace(/['"]use client['"];?\s*/g, '');
       changed = true;
    }
    
    if (changed) {
      fs.writeFileSync(filepath, content);
      console.log('Updated', filepath);
    }
  }
});
