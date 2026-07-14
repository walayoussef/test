// Stock initial si localStorage vide
const stockInitial = {
  "Déchets Inertes": 17,
  "Déchets Biodégradables": 45,
  "Déchets Recyclables": 17,
  "Déchets Combustibles": 31
};

// Charger stocks depuis localStorage ou initialiser
function chargerStocks() {
  const stocks = JSON.parse(localStorage.getItem("stocks"));
  if (!stocks) {
    localStorage.setItem("stocks", JSON.stringify(stockInitial));
    return {...stockInitial};
  }
  return stocks;
}

// Sauvegarder stocks dans localStorage
function sauvegarderStocks(stocks) {
  localStorage.setItem("stocks", JSON.stringify(stocks));
}

// Panier
let panier = JSON.parse(localStorage.getItem("panier")) || {};
let stocks = chargerStocks();

// Ajouter un lot au panier et décrémenter stock
function ajouterAuPanier(typeDechet) {
  if (stocks[typeDechet] && stocks[typeDechet] > 0) {
    // Décrémenter stock
    stocks[typeDechet]--;
    sauvegarderStocks(stocks);

    // Ajouter au panier
    if (panier[typeDechet]) {
      panier[typeDechet]++;
    } else {
      panier[typeDechet] = 1;
    }

    localStorage.setItem("panier", JSON.stringify(panier));

    // Mise à jour affichage panier et stock
    afficherPanier();
    majAffichageStockEtBoutons();

  } else {
    alert(`Stock épuisé pour ${typeDechet} !`);
  }
}

// Afficher le total des lots dans le compteur
function afficherPanier() {
  let totalLots = Object.values(panier).reduce((a, b) => a + b, 0);
  const panierCompteur = document.getElementById("panier-compteur");
  if (panierCompteur) {
    panierCompteur.textContent = totalLots;
  }
}

// Fonction pour mettre à jour l’affichage du stock et l’état des boutons Ajouter
function majAffichageStockEtBoutons() {
  const stocksActuels = chargerStocks();

  // Mettre à jour le texte de stock sur chaque carte
  for (const type in stocksActuels) {
    const stockElement = document.querySelector(`[data-stock="${type}"]`);
    if (stockElement) {
      stockElement.textContent = stocksActuels[type];
    }
    // Désactiver ou activer bouton "Ajouter"
    const btn = document.querySelector(`button[data-type="${type}"]`);
    if (btn) {
      btn.disabled = stocksActuels[type] <= 0;
    }
  }
}

// Initialiser l’affichage stock/boutons au chargement
document.addEventListener("DOMContentLoaded", () => {
  afficherPanier();
  majAffichageStockEtBoutons();
});
