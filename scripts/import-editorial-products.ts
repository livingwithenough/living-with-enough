import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {validateEditorialProducts} from '../src/lib/editorial-validation';
import {products} from '../src/data/products';
const args=process.argv.slice(2),file=args.find(a=>!a.startsWith('--'))||'src/data/editorial-products.json';
try{const data=JSON.parse(readFileSync(resolve(file),'utf8'));const errors=validateEditorialProducts(data,products);if(errors.length)throw new Error(errors.join('\n'));
 const count=data.filter((p:any)=>p.publication==='published').length;console.log('Validated '+data.length+' candidates; '+count+' publishable; '+(data.length-count)+' held.');
 if(args.includes('--write')){writeFileSync(resolve('src/data/editorial-products.json'),JSON.stringify(data,null,2)+'\n');console.log('Catalog replaced after validation. Review git diff before committing.');}
}catch(e){console.error(String(e));process.exitCode=1;}
