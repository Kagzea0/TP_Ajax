let data;

// Charge le fichier JSON depuis une URL ou un fichier local
fetch('js.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        console.log(data);

        // Appelle la fonction pour afficher les images initialement
        displayImages(data.images);
    })
    .catch(error => console.error('Erreur de chargement des données JSON:', error));

// Fonction pour afficher les images filtrées
function displayImages(images) {
    // Récupère le conteneur d'images
    const imageContainer = document.getElementById('image-container');

    imageContainer.innerHTML = ''; // Efface le contenu précédent

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.imageUrl;
        imgElement.alt = image.imageAlt;
        imageContainer.appendChild(imgElement);
    });

    // // Code permettant d'afficher les images dans des divs avec le nom de l'image
    // images.forEach(image => {
    //     // Je crée une div pour chaque image
    //     const imageDiv = document.createElement('div');
    
    //     // Je crée un élément img pour chaque image
    //     const imgElement = document.createElement('img');
    
    //     // Je met le chemin et l'alt de l'image dans le src de l'img
    //     imgElement.src = image.imageUrl;
    //     imgElement.alt = image.imageAlt;
    
    //     // Je crée un élément p pour chaque nom d'image
    //     const imageNom = document.createElement('p');
    
    //     // Je met les balises p et img dans la div
    //     imageDiv.appendChild(imageNom);
    //     imageDiv.appendChild(imgElement);
    
    //     // Je met la div dans le conteneur d'images
    //     imageContainer.appendChild(imageDiv);
    // });

    // Si aucune image n'est présente, masque la section
    if (images.length === 0) {
        imageContainer.style.display = 'none';
        return;
    }
};

// Récupère les éléments de liste déroulante
const wheelTypeSelect = document.getElementById('wheel-type');
const driveTypeSelect = document.getElementById('drive-type');
const deliveryDateSelect = document.getElementById('delivery-date');
const equipmentTypeSelect = document.getElementById('equipment-type');

// Ajoute un écouteur d'événement "change" à chaque liste
wheelTypeSelect.addEventListener('change', filterImages);
driveTypeSelect.addEventListener('change', filterImages);
deliveryDateSelect.addEventListener('change', filterImages);
equipmentTypeSelect.addEventListener('change', filterImages);

// Fonction pour filtrer les images en fonction des sélections
function filterImages() {
    // Récupère les valeurs sélectionnées dans les listes
    const selectedWheelType = wheelTypeSelect.value;
    const selectedDriveType = driveTypeSelect.value;
    const selectedDeliveryDate = deliveryDateSelect.value;
    const selectedEquipmentType = equipmentTypeSelect.value;

    // Filtrer les images en fonction des sélections
    const filteredImages = data.images.filter(image => {
        return (
            (selectedWheelType === 'Tous' || image.wheelType === selectedWheelType) &&
            (selectedDriveType === 'Tous' || image.driveType === selectedDriveType) &&
            (selectedDeliveryDate === 'Tous' || image.deliveryDate === selectedDeliveryDate) &&
            (selectedEquipmentType === 'Tous' || image.equipmentType === selectedEquipmentType)
        );
    });

    // Appelle la fonction pour afficher les images filtrées
    displayImages(filteredImages);
}

// Fonction pour réafficher toutes les images
function resetPage() {
    // Réinitialise les listes déroulantes en remettant leur valeur à "Tous"
    wheelTypeSelect.value = "Tous";
    driveTypeSelect.value = "Tous";
    deliveryDateSelect.value = "Tous";
    equipmentTypeSelect.value = "Tous";

    setTimeout(function () {location.reload()}, 1); // Recharge la page après 10ms

    // Réaffiche toutes les images
    // displayImages(data.images);
}

// Récupère le bouton de réinitialisation
const resetButton = document.getElementById('reset-button');

// Ajoute un écouteur d'événement au bouton de réinitialisation
resetButton.addEventListener('click', resetPage);