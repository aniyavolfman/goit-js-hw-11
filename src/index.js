    function fetchImages (name) {
    return fetch(
        `https://pixabay.com/api/?key=32728160-634e7d154d1682a06810c8278&q=flowers&image_type=photo&orientation=horizontal&safesearch=true`
    ).then(response => {
        if (!response.ok) {
    throw new Error(response.status);
    }
    return response.json()});
}

fetchImages().then(image => console.log(image.hits)).catch(error => console.log(error))