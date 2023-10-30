let data; // Variable globale pour stocker les données JSON

// Charge le fichier JSON depuis une URL ou un fichier local
fetch('js.json')
    .then(response => response.json()) // Transforme la réponse en JSON
    .then(jsonData => {
        data = jsonData; // Stocke les données JSON dans la variable globale
        console.log(data);

        // Appelle la fonction afficher fichier JSON
        displayImages(data);
    })
    .catch(error => console.error('Erreur de chargement des données JSON:', error));

// Fonction pour afficher les images filtrées
function displayImages(images) {
    // Récupère le conteneur d'images
    const imageContainer = document.getElementById('image-container'); // Assure-toi d'avoir l'ID correct

    // Parcours les images filtrées
    imageContainer.innerHTML = ''; // Efface le contenu précédent

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.imageUrl;
        imgElement.alt = image.imageAlt;
        imageContainer.appendChild(imgElement);
    });
}

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

// Fonction pour réinitialiser la page
function resetPage() {
    // Réinitialise les listes déroulantes en remettant leur valeur à "Tous"
    wheelTypeSelect.value = "Tous";
    driveTypeSelect.value = "Tous";
    deliveryDateSelect.value = "Tous";
    equipmentTypeSelect.value = "Tous";

    // Réaffiche toutes les images
    displayImages(data.images);
}


// Récupère le bouton de réinitialisation
const resetButton = document.getElementById('reset-button');

// Ajoute un écouteur d'événement au bouton de réinitialisation
resetButton.addEventListener('click', resetPage);
