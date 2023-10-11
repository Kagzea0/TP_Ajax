// Charge le fichier JSON depuis une URL ou un fichier local
fetch('js.json')
    .then(response => response.json()) // Transforme la réponse en JSON
    .then(data => {
        // "data" est maintenant un objet JavaScript contenant les données JSON
        console.log(data);

        // Appelle la fonction pour afficher toutes les images à partir des données JSON
        displayImages(data);
    })
    .catch(error => console.error('Erreur de chargement des données JSON:', error));

function displayImages(data) {
    // Récupère le conteneur d'images
    const imageContainer = document.getElementById('image-container'); // Remplace avec l'ID de ton conteneur d'images
    
    // Parcours le tableau d'images dans les données JSON
    data.images.forEach(image => {
        // Crée un élément img pour chaque image
        const imgElement = document.createElement('img');

        // Définis l'attribut src avec l'URL de l'image du JSON
        imgElement.src = image.imageUrl;

        // Définis l'attribut alt avec le texte alternatif de l'image du JSON
        imgElement.alt = image.imageAlt;

        // Ajoute l'élément img à ton conteneur d'images
        imageContainer.appendChild(imgElement);
    });
}
