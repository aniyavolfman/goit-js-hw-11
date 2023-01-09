fetch("https://pixabay.com/api/?key=32728160-634e7d154d1682a06810c8278&q=flowers&image_type=photo&orientation=horizontal&safesearch=true").then((o=>{if(!o.ok)throw new Error(o.status);return o.json()})).then((o=>console.log(o.hits))).catch((o=>console.log(o)));
//# sourceMappingURL=index.21a088ad.js.map
