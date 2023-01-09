fetch("https://pixabay.com/api/?key=32728160-634e7d154d1682a06810c8278&q=flowers&image_type=photo&orientation=horizontal&safesearch=true").then((function(t){if(!t.ok)throw new Error(t.status);return t.json()})).then((function(t){return console.log(t.hits)})).catch((function(t){return console.log(t)}));
//# sourceMappingURL=index.dce1ece1.js.map
