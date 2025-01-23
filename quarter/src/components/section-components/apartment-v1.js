import React, { useState } from "react";
import axios from "axios";
import "./add.css";

const AddProperty = () => {
  const initialState = {
    title: "",
    price: "",
    transactionType: "sale",
    productType: "Maison unifamiliale",
    propertyCategory: "residential",
    status: "available",
    address: "",
    city: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
    features: {
      bedrooms: 0,
      bathrooms: 0,
      parkingSpaces: 0,
      garages: 0,
      area: 0,
      hasPool: false,
      isWheelchairAccessible: false,
      isWaterfront: false,
      hasNavigableWater: false,
      allowsPets: false,
      allowsSmoking: false,
    },
    images: [""],
    buildingDetails: {
      yearBuilt: "",
      isNewConstruction: false,
      isHistorical: false,
      structureType: "Plain-pied",
    },
    isVirtualTourAvailable: false,
    isOpenHouse: false,
    lotSize: 0,
    description: "",
    agentName: "",
    moveInDate: "",
    isForeclosure: false,
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCoordinatesChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      coordinates: {
        ...prevState.coordinates,
        [name]: parseFloat(value),
      },
    }));
  };

  const handleNestedChange = (e, section) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [name]: parseInt(value, 10),
      },
    }));
  };

  const handleImageChange = (e, index) => {
    const newImages = [...formData.images];
    newImages[index] = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  const handleAddImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ""],
    }));
  };

  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "title",
      "price",
      "transactionType",
      "productType",
      "propertyCategory",
      "address",
      "city",
      "agentName",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Le champ "${field}" est obligatoire.`);
        return false;
      }
    }

    if (!formData.coordinates.latitude || !formData.coordinates.longitude) {
      alert("Les champs Latitude et Longitude sont obligatoires.");
      return false;
    }

    if (formData.images.some((img) => img.trim() === "")) {
      alert("Veuillez ajouter au moins une URL d'image valide.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Payload envoyé :", formData);

    if (!validateForm()) return;

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Produit ajouté avec succès !");
      setFormData(initialState);
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout du produit :",
        error.response?.data || error.message
      );
      alert(
        `Échec de l'ajout du produit : ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="add-property-container">
      <h2>Ajouter une propriété</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre :</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Prix :</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Type de transaction :</label>
          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            required
          >
            <option value="sale">À vendre</option>
            <option value="rent">À louer</option>
          </select>
        </div>
        <div>
          <label>Type de produit :</label>
          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            required
          >
            <option value="Maison unifamiliale">Maison unifamiliale</option>
            <option value="Condo">Condo</option>
            <option value="Plex">Plex</option>
            <option value="Loft / Studio">Loft / Studio</option>
          </select>
        </div>
        <div>
          <label>Latitude :</label>
          <input
            type="number"
            step="any"
            name="latitude"
            value={formData.coordinates.latitude}
            onChange={handleCoordinatesChange}
            placeholder="Exemple : -14.69278"
            required
          />
        </div>
        <div>
          <label>Longitude :</label>
          <input
            type="number"
            step="any"
            name="longitude"
            value={formData.coordinates.longitude}
            onChange={handleCoordinatesChange}
            placeholder="Exemple : 17.44639"
            required
          />
        </div>
        <div>
          <label>Adresse :</label>
          <select
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez une adresse</option>
            <option value="Dakar/Dakar(Gueule tapee fass colobane)">Dakar/Dakar (Gueule tapee fass colobane)</option>
  <option value="Dakar/Dakar(Fann point e amitie)">Dakar/Dakar (Fann point e amitie)</option>
  <option value="Dakar/Dakar(Goree)">Dakar/Dakar (Goree)</option>
  <option value="Dakar/Dakar(Medina)">Dakar/Dakar (Medina)</option>
  <option value="Dakar/Dakar(Plateau)">Dakar/Dakar (Plateau)</option>
  <option value="Dakar/Dakar(Camberene)">Dakar/Dakar (Camberene)</option>
  <option value="Dakar/Dakar(Dieuppeul derkle)">Dakar/Dakar (Dieuppeul derkle)</option>
  <option value="Dakar/Dakar(Biscuiterie)">Dakar/Dakar (Biscuiterie)</option>
  <option value="Dakar/Dakar(Hlm)">Dakar/Dakar (Hlm)</option>
  <option value="Dakar/Dakar(Hann bel air)">Dakar/Dakar (Hann bel air)</option>
  <option value="Dakar/Dakar(Grand dakar)">Dakar/Dakar (Grand dakar)</option>
  <option value="Dakar/Dakar(Sicap liberte)">Dakar/Dakar (Sicap liberte)</option>
  <option value="Dakar/Dakar(Yoff)">Dakar/Dakar (Yoff)</option>
  <option value="Dakar/Dakar(Mermoz sacre coeur)">Dakar/Dakar (Mermoz sacre coeur)</option>
  <option value="Dakar/Dakar(Ngor)">Dakar/Dakar (Ngor)</option>
  <option value="Dakar/Dakar(Ouakam)">Dakar/Dakar (Ouakam)</option>
  <option value="Dakar/Dakar(Grand YOFF)">Dakar/Dakar (Grand YOFF)</option>
  <option value="Dakar/Dakar(Parcelles assainies)">Dakar/Dakar (Parcelles assainies)</option>
  <option value="Dakar/Dakar(Patte d oie)">Dakar/Dakar (Patte d oie)</option>
  <option value="Dakar/Guédiawaye(Golf sud)">Dakar/Guédiawaye (Golf sud)</option>
  <option value="Dakar/Guédiawaye(Medina gounass)">Dakar/Guédiawaye (Medina gounass)</option>
  <option value="Dakar/Guédiawaye(Ndiareme)">Dakar/Guédiawaye (Ndiareme)</option>
  <option value="Dakar/Guédiawaye(Sam notaire)">Dakar/Guédiawaye (Sam notaire)</option>
  <option value="Dakar/Guédiawaye(Wakhinane nimzat)">Dakar/Guédiawaye (Wakhinane nimzat)</option>
  <option value="Dakar/Pikine(Dalifort)">Dakar/Pikine (Dalifort)</option>
  <option value="Dakar/Pikine(Djida thiaroye kao)">Dakar/Pikine (Djida thiaroye kao)</option>
  <option value="Dakar/Pikine(Guinaw rail nord)">Dakar/Pikine (Guinaw rail nord)</option>
  <option value="Dakar/Pikine(Guinaw rail sud)">Dakar/Pikine (Guinaw rail sud)</option>
  <option value="Dakar/Pikine(Pikine EST)">Dakar/Pikine (Pikine EST)</option>
  <option value="Dakar/Pikine(Pikine NORD)">Dakar/Pikine (Pikine NORD)</option>
  <option value="Dakar/Pikine(Pikine OUEST)">Dakar/Pikine (Pikine OUEST)</option>
  <option value="Dakar/Pikine(Keur massar)">Dakar/Pikine (Keur massar)</option>
  <option value="Dakar/Pikine(Malika)">Dakar/Pikine (Malika)</option>
  <option value="Dakar/Pikine(Yeumbeul nord)">Dakar/Pikine (Yeumbeul nord)</option>
  <option value="Dakar/Pikine(Yeumbeul sud)">Dakar/Pikine (Yeumbeul sud)</option>
  <option value="Dakar/Pikine(Mbao)">Dakar/Pikine (Mbao)</option>
  <option value="Dakar/Pikine(Diamaguene sicap mbao)">Dakar/Pikine (Diamaguene sicap mbao)</option>
  <option value="Dakar/Pikine(Thiaroye gare)">Dakar/Pikine (Thiaroye gare)</option>
  <option value="Dakar/Pikine(Thiaroye sur mer)">Dakar/Pikine (Thiaroye sur mer)</option>
  <option value="Dakar/Pikine(Tivavouane diaksao)">Dakar/Pikine (Tivavouane diaksao)</option>
  <option value="Dakar/Rufisque(Rufisque est)">Dakar/Rufisque (Rufisque est)</option>
  <option value="Dakar/Rufisque(Rufisque nord)">Dakar/Rufisque (Rufisque nord)</option>
  <option value="Dakar/Rufisque(Rufisque ouest)">Dakar/Rufisque (Rufisque ouest)</option>
  <option value="Dakar/Rufisque(Bambylor)">Dakar/Rufisque (Bambylor)</option>
  <option value="Dakar/Rufisque(Tivaouane peulh - niaga)">Dakar/Rufisque (Tivaouane peulh - niaga)</option>
  <option value="Dakar/Rufisque(Yene)">Dakar/Rufisque (Yene)</option>
  <option value="Dakar/Rufisque(Bargny)">Dakar/Rufisque (Bargny)</option>
  <option value="Dakar/Rufisque(Diamniadio)">Dakar/Rufisque (Diamniadio)</option>
  <option value="Dakar/Rufisque(Jaxaay-plles-niakoul rab)">Dakar/Rufisque (Jaxaay-plles-niakoul rab)</option>
  <option value="Dakar/Rufisque(Sangalkam)">Dakar/Rufisque (Sangalkam)</option>
  <option value="Dakar/Rufisque(Sebikotane)">Dakar/Rufisque (Sebikotane)</option>
  <option value="Dakar/Rufisque(Sendou)">Dakar/Rufisque (Sendou)</option>
  <option value="Diourbel/Bambey(Baba garage)">Diourbel/Bambey (Baba garage)</option>
  <option value="Diourbel/Bambey(Dangalma)">Diourbel/Bambey (Dangalma)</option>
  <option value="Diourbel/Bambey(Dinguiraye)">Diourbel/Bambey (Dinguiraye)</option>
  <option value="Diourbel/Bambey(Gawane)">Diourbel/Bambey (Gawane)</option>
  <option value="Diourbel/Bambey(Keur samba kane)">Diourbel/Bambey (Keur samba kane)</option>
  <option value="Diourbel/Bambey(Lambaye)">Diourbel/Bambey (Lambaye)</option>
  <option value="Diourbel/Bambey(Ndondol)">Diourbel/Bambey (Ndondol)</option>
  <option value="Diourbel/Bambey(Ngogom)">Diourbel/Bambey (Ngogom)</option>
  <option value="Diourbel/Bambey(Ngoye)">Diourbel/Bambey (Ngoye)</option>
  <option value="Diourbel/Bambey(Refane)">Diourbel/Bambey (Refane)</option>
  <option value="Diourbel/Bambey(Thiakhar)">Diourbel/Bambey (Thiakhar)</option>
  <option value="Diourbel/Bambey(Bambey)">Diourbel/Bambey (Bambey)</option>
  <option value="Diourbel/Diourbel(Dankh sene)">Diourbel/Diourbel (Dankh sene)</option>
  <option value="Diourbel/Diourbel(Gade escale)">Diourbel/Diourbel (Gade escale)</option>
  <option value="Diourbel/Diourbel(Keur ngalgou)">Diourbel/Diourbel (Keur ngalgou)</option>
  <option value="Diourbel/Diourbel(Ndindy)">Diourbel/Diourbel (Ndindy)</option>
  <option value="Diourbel/Diourbel(Ndoulo)">Diourbel/Diourbel (Ndoulo)</option>
  <option value="Diourbel/Diourbel(Ngohe)">Diourbel/Diourbel (Ngohe)</option>
  <option value="Diourbel/Diourbel(Pattar)">Diourbel/Diourbel (Pattar)</option>
  <option value="Diourbel/Diourbel(Taiba moutoupha)">Diourbel/Diourbel (Taiba moutoupha)</option>
  <option value="Diourbel/Diourbel(Tocky gare)">Diourbel/Diourbel (Tocky gare)</option>
  <option value="Diourbel/Diourbel(Toure mbonde)">Diourbel/Diourbel (Toure mbonde)</option>
  <option value="Diourbel/Mbacke(Dalla ngabou)">Diourbel/Mbacke (Dalla ngabou)</option>
  <option value="Diourbel/Mbacke(Dandeye gouygui)">Diourbel/Mbacke (Dandeye gouygui)</option>
  <option value="Diourbel/Mbacke(Darou nahim)">Diourbel/Mbacke (Darou nahim)</option>
  <option value="Diourbel/Mbacke(Darou salam typ)">Diourbel/Mbacke (Darou salam typ)</option>
  <option value="Fatick/Fatick(Diaoule)">Fatick/Fatick (Diaoule)</option>
  <option value="Fatick/Fatick(Diarrere)">Fatick/Fatick (Diarrere)</option>
  <option value="Fatick/Fatick(Diouroup)">Fatick/Fatick (Diouroup)</option>
  <option value="Fatick/Fatick(Djilass)">Fatick/Fatick (Djilass)</option>
  <option value="Fatick/Fatick(Fimela)">Fatick/Fatick (Fimela)</option>
  <option value="Fatick/Fatick(Loul sessene)">Fatick/Fatick (Loul sessene)</option>
  <option value="Fatick/Fatick(Mbellacadiao)">Fatick/Fatick (Mbellacadiao)</option>
  <option value="Fatick/Fatick(Ndiob)">Fatick/Fatick (Ndiob)</option>
  <option value="Fatick/Fatick(Ngayokheme)">Fatick/Fatick (Ngayokheme)</option>
  <option value="Fatick/Fatick(Niakhar)">Fatick/Fatick (Niakhar)</option>
  <option value="Fatick/Fatick(Palmarin facao)">Fatick/Fatick (Palmarin facao)</option>
  <option value="Fatick/Fatick(Patar)">Fatick/Fatick (Patar)</option>
  <option value="Fatick/Fatick(Tattaguine)">Fatick/Fatick (Tattaguine)</option>
  <option value="Fatick/Fatick(Thiare ndialgui)">Fatick/Fatick (Thiare ndialgui)</option>
  <option value="Fatick/Fatick(Diakhao)">Fatick/Fatick (Diakhao)</option>
  <option value="Fatick/Fatick(Diofior)">Fatick/Fatick (Diofior)</option>
  <option value="Fatick/Foundiougne(Bassoul)">Fatick/Foundiougne (Bassoul)</option>
  <option value="Fatick/Foundiougne(Diagane barka)">Fatick/Foundiougne (Diagane barka)</option>
  <option value="Fatick/Foundiougne(Dionewar)">Fatick/Foundiougne (Dionewar)</option>
  <option value="Fatick/Foundiougne(Diossong)">Fatick/Foundiougne (Diossong)</option>
  <option value="Fatick/Foundiougne(Djilor)">Fatick/Foundiougne (Djilor)</option>
  <option value="Fatick/Foundiougne(Djirnda)">Fatick/Foundiougne (Djirnda)</option>
  <option value="Fatick/Foundiougne(Keur saloum diane)">Fatick/Foundiougne (Keur saloum diane)</option>
  <option value="Fatick/Foundiougne(Keur samba gueye)">Fatick/Foundiougne (Keur samba gueye)</option>
  <option value="Fatick/Foundiougne(Mbam)">Fatick/Foundiougne (Mbam)</option>
  <option value="Fatick/Foundiougne(Niassene)">Fatick/Foundiougne (Niassene)</option>
  <option value="Fatick/Foundiougne(Nioro alassane tall)">Fatick/Foundiougne (Nioro alassane tall)</option>
  <option value="Fatick/Foundiougne(Toubacouta)">Fatick/Foundiougne (Toubacouta)</option>
  <option value="Fatick/Foundiougne(Foundiougne)">Fatick/Foundiougne (Foundiougne)</option>
  <option value="Fatick/Foundiougne(Karang poste)">Fatick/Foundiougne (Karang poste)</option>
  <option value="Fatick/Foundiougne(Passi)">Fatick/Foundiougne (Passi)</option>
  <option value="Fatick/Foundiougne(Sokone)">Fatick/Foundiougne (Sokone)</option>
  <option value="Fatick/Foundiougne(Soum)">Fatick/Foundiougne (Soum)</option>
  <option value="Fatick/Gossas(Colobane)">Fatick/Gossas (Colobane)</option>
  <option value="Fatick/Gossas(Mbar)">Fatick/Gossas (Mbar)</option>
  <option value="Fatick/Gossas(Ndiene lagane)">Fatick/Gossas (Ndiene lagane)</option>
  <option value="Fatick/Gossas(Ouadiour)">Fatick/Gossas (Ouadiour)</option>
  <option value="Fatick/Gossas(Patar lia)">Fatick/Gossas (Patar lia)</option>
  <option value="Fatick/Gossas(Gossas)">Fatick/Gossas (Gossas)</option>
  <option value="Kedougou/Kedougou(Fongolimbi)">Kedougou/Kedougou (Fongolimbi)</option>
  <option value="Kedougou/Kedougou(Ninefecha)">Kedougou/Kedougou (Ninefecha)</option>
  <option value="Kedougou/Kedougou(Tomboronkoto)">Kedougou/Kedougou (Tomboronkoto)</option>
  <option value="Kedougou/Kedougou(Kedougou)">Kedougou/Kedougou (Kedougou)</option>
  <option value="Kedougou/Salemata(Dakately)">Kedougou/Salemata (Dakately)</option>
  <option value="Kedougou/Salemata(Dar salam)">Kedougou/Salemata (Dar salam)</option>
  <option value="Kedougou/Salemata(Ethiolo)">Kedougou/Salemata (Ethiolo)</option>
  <option value="Kedougou/Salemata(Kevoye)">Kedougou/Salemata (Kevoye)</option>
  <option value="Kedougou/Salemata(Oubadji)">Kedougou/Salemata (Oubadji)</option>
  <option value="Kedougou/Salemata(Salemata)">Kedougou/Salemata (Salemata)</option>
  <option value="Kedougou/Saraya(Bembou)">Kedougou/Saraya (Bembou)</option>
  <option value="Kedougou/Saraya(Khossanto)">Kedougou/Saraya (Khossanto)</option>
  <option value="Kedougou/Saraya(Medina baffe)">Kedougou/Saraya (Medina baffe)</option>
  <option value="Kedougou/Saraya(Missirah sirimana)">Kedougou/Saraya (Missirah sirimana)</option>
  <option value="Kedougou/Saraya(Sabodola)">Kedougou/Saraya (Sabodola)</option>
  <option value="Kedougou/Saraya(Saraya)">Kedougou/Saraya (Saraya)</option>
  <option value="Kolda/Kolda(Dioulacolon)">Kolda/Kolda (Dioulacolon)</option>
  <option value="Kolda/Kolda(Guiro yero bocar)">Kolda/Kolda (Guiro yero bocar)</option>
  <option value="Kolda/Kolda(Mampatim)">Kolda/Kolda (Mampatim)</option>
  <option value="Kolda/Kolda(Medina cherif)">Kolda/Kolda (Medina cherif)</option>
  <option value="Kolda/Kolda(Medina el hadji)">Kolda/Kolda (Medina el hadji)</option>
  <option value="Kolda/Kolda(Sare bidji)">Kolda/Kolda (Sare bidji)</option>
  <option value="Kolda/Kolda(Tankanto escale)">Kolda/Kolda (Tankanto escale)</option>
  <option value="Kolda/Kolda(Thietty)">Kolda/Kolda (Thietty)</option>
  <option value="Kolda/Kolda(Kolda)">Kolda/Kolda (Kolda)</option>
  <option value="Kolda/Kolda(Dioulacolon)">Kolda/Kolda (Dioulacolon)</option>
  <option value="Kolda/Kolda(Guiro yero bocar)">Kolda/Kolda (Guiro yero bocar)</option>
  <option value="Kolda/Kolda(Mampatim)">Kolda/Kolda (Mampatim)</option>
  <option value="Kolda/Kolda(Medina cherif)">Kolda/Kolda (Medina cherif)</option>
  <option value="Kolda/Kolda(Medina el hadji)">Kolda/Kolda (Medina el hadji)</option>
  <option value="Kolda/Kolda(Sare bidji)">Kolda/Kolda (Sare bidji)</option>
  <option value="Kolda/Kolda(Tankanto escale)">Kolda/Kolda (Tankanto escale)</option>
  <option value="Kolda/Kolda(Thietty)">Kolda/Kolda (Thietty)</option>
  <option value="Kolda/Kolda(Dabo)">Kolda/Kolda (Dabo)</option>
  <option value="Kolda/Kolda(Salikegne)">Kolda/Kolda (Salikegne)</option>
  <option value="Kolda/Kolda(Sare yoba diega)">Kolda/Kolda (Sare yoba diega)</option>
  <option value="Kolda/Medina yoro foulah(Badion)">Kolda/Medina yoro foulah (Badion)</option>
  <option value="Kolda/Medina yoro foulah(Bignarabe)">Kolda/Medina yoro foulah (Bignarabe)</option>
  <option value="Kolda/Medina yoro foulah(Bourouco)">Kolda/Medina yoro foulah (Bourouco)</option>
  <option value="Kolda/Medina yoro foulah(Fafacourou)">Kolda/Medina yoro foulah (Fafacourou)</option>
  <option value="Kolda/Medina yoro foulah(Kerewane)">Kolda/Medina yoro foulah (Kerewane)</option>
  <option value="Kolda/Medina yoro foulah(Koulinto)">Kolda/Medina yoro foulah (Koulinto)</option>
  <option value="Kolda/Medina yoro foulah(Ndorna)">Kolda/Medina yoro foulah (Ndorna)</option>
  <option value="Kolda/Medina yoro foulah(Niaming)">Kolda/Medina yoro foulah (Niaming)</option>
  <option value="Kolda/Medina yoro foulah(Medina yoro foulah)">Kolda/Medina yoro foulah (Medina yoro foulah)</option>
  <option value="Kolda/Medina yoro foulah(Pata)">Kolda/Medina yoro foulah (Pata)</option>
  <option value="Kolda/Velingara(Bonconto)">Kolda/Velingara (Bonconto)</option>
  <option value="Kolda/Velingara(Kandia)">Kolda/Velingara (Kandia)</option>
  <option value="Kolda/Velingara(Kandiaye)">Kolda/Velingara (Kandiaye)</option>
  <option value="Kolda/Velingara(Linkering)">Kolda/Velingara (Linkering)</option>
  <option value="Kolda/Velingara(Medina gounasse)">Kolda/Velingara (Medina gounasse)</option>
  <option value="Kolda/Velingara(Nemataba)">Kolda/Velingara (Nemataba)</option>
  <option value="Kolda/Velingara(Ouassadou)">Kolda/Velingara (Ouassadou)</option>
  <option value="Kolda/Velingara(Pakour)">Kolda/Velingara (Pakour)</option>
  <option value="Kolda/Velingara(Paroumba)">Kolda/Velingara (Paroumba)</option>
  <option value="Kolda/Velingara(Sare coli salle)">Kolda/Velingara (Sare coli salle)</option>
  <option value="Kolda/Velingara(Sinthiang koundara)">Kolda/Velingara (Sinthiang koundara)</option>
  <option value="Kolda/Velingara(Diaobe kabendou)">Kolda/Velingara (Diaobe kabendou)</option>
  <option value="Kolda/Velingara(Kounkane)">Kolda/Velingara (Kounkane)</option>
  <option value="Kolda/Velingara(Velingara)">Kolda/Velingara (Velingara)</option>
  <option value="Louga/Kebemer(Bandegne ouolof)">Louga/Kebemer (Bandegne ouolof)</option>
  <option value="Louga/Kebemer(Darou marnane)">Louga/Kebemer (Darou marnane)</option>
  <option value="Louga/Kebemer(Darou mousti)">Louga/Kebemer (Darou mousti)</option>
  <option value="Louga/Kebemer(Diokoul ndiawrigne)">Louga/Kebemer (Diokoul ndiawrigne)</option>
  <option value="Louga/Kebemer(Kab gaye)">Louga/Kebemer (Kab gaye)</option>
  <option value="Louga/Kebemer(Kanene ndiob)">Louga/Kebemer (Kanene ndiob)</option>
  <option value="Louga/Kebemer(Loro)">Louga/Kebemer (Loro)</option>
  <option value="Louga/Kebemer(Mbacke cajor)">Louga/Kebemer (Mbacke cajor)</option>
  <option value="Louga/Kebemer(Mbadiane)">Louga/Kebemer (Mbadiane)</option>
  <option value="Louga/Kebemer(Ndande)">Louga/Kebemer (Ndande)</option>
  <option value="Louga/Kebemer(Ndoyene)">Louga/Kebemer (Ndoyene)</option>
  <option value="Louga/Kebemer(Ngourane ouolof)">Louga/Kebemer (Ngourane ouolof)</option>
  <option value="Louga/Kebemer(Sagata gueth)">Louga/Kebemer (Sagata gueth)</option>
  <option value="Louga/Kebemer(Sam yabal)">Louga/Kebemer (Sam yabal)</option>
  <option value="Louga/Kebemer(Thiep)">Louga/Kebemer (Thiep)</option>
  <option value="Louga/Kebemer(Thiolom fall)">Louga/Kebemer (Thiolom fall)</option>
  <option value="Louga/Kebemer(Touba merina)">Louga/Kebemer (Touba merina)</option>
  <option value="Louga/Kebemer(Gueoul)">Louga/Kebemer (Gueoul)</option>
  <option value="Louga/Kebemer(Kebemer)">Louga/Kebemer (Kebemer)</option>
  <option value="Louga/Linguere(Affe djolof)">Louga/Linguere (Affe djolof)</option>
  <option value="Louga/Linguere(Barkedji)">Louga/Linguere (Barkedji)</option>
  <option value="Louga/Linguere(Boulal)">Louga/Linguere (Boulal)</option>
  <option value="Louga/Linguere(Dealy)">Louga/Linguere (Dealy)</option>
  <option value="Louga/Linguere(Dodji)">Louga/Linguere (Dodji)</option>
  <option value="Louga/Linguere(Gassane)">Louga/Linguere (Gassane)</option>
  <option value="Louga/Linguere(Kambe)">Louga/Linguere (Kambe)</option>
  <option value="Louga/Linguere(Labgar)">Louga/Linguere (Labgar)</option>
  <option value="Louga/Linguere(Mboula)">Louga/Linguere (Mboula)</option>
  <option value="Louga/Linguere(Ouarkhokh)">Louga/Linguere (Ouarkhokh)</option>
  <option value="Louga/Linguere(Sagatta djolof)">Louga/Linguere (Sagatta djolof)</option>
  <option value="Louga/Linguere(Tessekere forage)">Louga/Linguere (Tessekere forage)</option>
  <option value="Louga/Linguere(Thiamene passe)">Louga/Linguere (Thiamene passe)</option>
  <option value="Louga/Linguere(Thiargny)">Louga/Linguere (Thiargny)</option>
  <option value="Louga/Linguere(Thiel)">Louga/Linguere (Thiel)</option>
  <option value="Louga/Linguere(Yang yang)">Louga/Linguere (Yang yang)</option>
  <option value="Louga/Linguere(Dahra)">Louga/Linguere (Dahra)</option>
  <option value="Louga/Linguere(Linguere)">Louga/Linguere (Linguere)</option>
  <option value="Louga/Linguere(Mbeuleukhe)">Louga/Linguere (Mbeuleukhe)</option>
  <option value="Matam/Kanel(Aoure)">Matam/Kanel (Aoure)</option>
  <option value="Matam/Kanel(Bokiladji)">Matam/Kanel (Bokiladji)</option>
  <option value="Matam/Kanel(Ndendory)">Matam/Kanel (Ndendory)</option>
  <option value="Matam/Kanel(Orkadiere)">Matam/Kanel (Orkadiere)</option>
  <option value="Matam/Kanel(Wouro sidy)">Matam/Kanel (Wouro sidy)</option>
  <option value="Matam/Kanel(Dembancane)">Matam/Kanel (Dembancane)</option>
  <option value="Matam/Kanel(Hamadi hounare)">Matam/Kanel (Hamadi hounare)</option>
  <option value="Matam/Kanel(Kanel)">Matam/Kanel (Kanel)</option>
  <option value="Matam/Kanel(Odobere)">Matam/Kanel (Odobere)</option>
  <option value="Matam/Kanel(Ouaounde)">Matam/Kanel (Ouaounde)</option>
  <option value="Matam/Kanel(Semme)">Matam/Kanel (Semme)</option>
  <option value="Matam/Matam(Thilogne)">Matam/Matam (Thilogne)</option>
  <option value="Matam/Matam(Orefonde)">Matam/Matam (Orefonde)</option>
  <option value="Matam/Ranerou ferlo(Ranerou)">Matam/Ranerou ferlo (Ranerou)</option>
  <option value="Matam/Ranerou ferlo(Lougre thioly)">Matam/Ranerou ferlo (Lougre thioly)</option>
  <option value="Matam/Ranerou ferlo(Oudalaye)">Matam/Ranerou ferlo (Oudalaye)</option>
  <option value="Matam/Ranerou ferlo(Velingara)">Matam/Ranerou ferlo (Velingara)</option>
  <option value="Saint-louis/Dagana(Bokhol)">Saint-louis/Dagana (Bokhol)</option>
  <option value="Saint-louis/Dagana(Diama)">Saint-louis/Dagana (Diama)</option>
  <option value="Saint-louis/Dagana(Gnith)">Saint-louis/Dagana (Gnith)</option>
  <option value="Saint-louis/Dagana(Mbane)">Saint-louis/Dagana (Mbane)</option>
  <option value="Saint-louis/Dagana(Ronkh)">Saint-louis/Dagana (Ronkh)</option>
  <option value="Saint-louis/Dagana(Dagana)">Saint-louis/Dagana (Dagana)</option>
  <option value="Saint-louis/Dagana(Gae)">Saint-louis/Dagana (Gae)</option>
  <option value="Saint-louis/Dagana(Ndombo sandjiry)">Saint-louis/Dagana (Ndombo sandjiry)</option>
  <option value="Saint-louis/Dagana(Richard toll)">Saint-louis/Dagana (Richard toll)</option>
  <option value="Saint-louis/Dagana(Ross bethio)">Saint-louis/Dagana (Ross bethio)</option>
  <option value="Saint-louis/Dagana(Rosso senegal)">Saint-louis/Dagana (Rosso senegal)</option>
  <option value="Saint-louis/Podor(Boke dialloube)">Saint-louis/Podor (Boke dialloube)</option>
  <option value="Saint-louis/Podor(Dodel)">Saint-louis/Podor (Dodel)</option>
  <option value="Saint-louis/Podor(Doumga lao)">Saint-louis/Podor (Doumga lao)</option>
  <option value="Saint-louis/Podor(Fanaye)">Saint-louis/Podor (Fanaye)</option>
  <option value="Saint-louis/Podor(Gamadji sare)">Saint-louis/Podor (Gamadji sare)</option>
  <option value="Saint-louis/Podor(Guede village)">Saint-louis/Podor (Guede village)</option>
  <option value="Saint-louis/Podor(Madina ndiathbe)">Saint-louis/Podor (Madina ndiathbe)</option>
  <option value="Saint-louis/Podor(Mbolo birane)">Saint-louis/Podor (Mbolo birane)</option>
  <option value="Saint-louis/Podor(Meri)">Saint-louis/Podor (Meri)</option>
  <option value="Saint-louis/Podor(Ndiayene peindao)">Saint-louis/Podor (Ndiayene peindao)</option>
  <option value="Saint-louis/Podor(Aere lao)">Saint-louis/Podor (Aere lao)</option>
  <option value="Saint-louis/Podor(Bode lao)">Saint-louis/Podor (Bode lao)</option>
  <option value="Saint-louis/Podor(Demette)">Saint-louis/Podor (Demette)</option>
  <option value="Saint-louis/Podor(Galoya toucouleur)">Saint-louis/Podor (Galoya toucouleur)</option>
  <option value="Saint-louis/Podor(Gollere)">Saint-louis/Podor (Gollere)</option>
  <option value="Saint-louis/Podor(Guede chantier)">Saint-louis/Podor (Guede chantier)</option>
  <option value="Saint-louis/Podor(Mboumba)">Saint-louis/Podor (Mboumba)</option>
  <option value="Saint-louis/Podor(Ndioum)">Saint-louis/Podor (Ndioum)</option>
  <option value="Saint-louis/Podor(Niandane)">Saint-louis/Podor (Niandane)</option>
  <option value="Saint-louis/Podor(Pete)">Saint-louis/Podor (Pete)</option>
  <option value="Saint-louis/Podor(Podor)">Saint-louis/Podor (Podor)</option>
  <option value="Saint-louis/Podor(Walalde)">Saint-louis/Podor (Walalde)</option>
  <option value="Saint-louis/Saint-louis(Fass ngom)">Saint-louis/Saint-louis (Fass ngom)</option>
  <option value="Saint-louis/Saint-louis(Gandon)">Saint-louis/Saint-louis (Gandon)</option>
  <option value="Saint-louis/Saint-louis(Ndiebene gandiole)">Saint-louis/Saint-louis (Ndiebene gandiole)</option>
  <option value="Saint-louis/Saint-louis(Mpal)">Saint-louis/Saint-louis (Mpal)</option>
  <option value="Saint-louis/Saint-louis(Saint-louis)">Saint-louis/Saint-louis (Saint-louis)</option>
  <option value="Sedhiou/Bounkiling(Boghal)">Sedhiou/Bounkiling (Boghal)</option>
  <option value="Sedhiou/Bounkiling(Bona)">Sedhiou/Bounkiling (Bona)</option>
  <option value="Sedhiou/Bounkiling(Diacounda)">Sedhiou/Bounkiling (Diacounda)</option>
  <option value="Sedhiou/Bounkiling(Diambaty)">Sedhiou/Bounkiling (Diambaty)</option>
  <option value="Sedhiou/Bounkiling(Diaroume)">Sedhiou/Bounkiling (Diaroume)</option>
  <option value="Sedhiou/Bounkiling(Djinany)">Sedhiou/Bounkiling (Djinany)</option>
  <option value="Sedhiou/Bounkiling(Faoune)">Sedhiou/Bounkiling (Faoune)</option>
  <option value="Sedhiou/Bounkiling(Inor)">Sedhiou/Bounkiling (Inor)</option>
  <option value="Sedhiou/Bounkiling(Kandion mangana)">Sedhiou/Bounkiling (Kandion mangana)</option>
  <option value="Sedhiou/Bounkiling(Ndiamalathiel)">Sedhiou/Bounkiling (Ndiamalathiel)</option>
  <option value="Sedhiou/Bounkiling(Tankon)">Sedhiou/Bounkiling (Tankon)</option>
  <option value="Sedhiou/Bounkiling(Bounkiling)">Sedhiou/Bounkiling (Bounkiling)</option>
  <option value="Sedhiou/Bounkiling(Madina wandifa)">Sedhiou/Bounkiling (Madina wandifa)</option>
  <option value="Sedhiou/Bounkiling(Ndiamacouta)">Sedhiou/Bounkiling (Ndiamacouta)</option>
  <option value="Sedhiou/Goudomp(Baghere)">Sedhiou/Goudomp (Baghere)</option>
  <option value="Sedhiou/Goudomp(Dioudoubou)">Sedhiou/Goudomp (Dioudoubou)</option>
  <option value="Sedhiou/Goudomp(Djibanar)">Sedhiou/Goudomp (Djibanar)</option>
  <option value="Sedhiou/Goudomp(Kaour)">Sedhiou/Goudomp (Kaour)</option>
  <option value="Sedhiou/Goudomp(Karantaba)">Sedhiou/Goudomp (Karantaba)</option>
  <option value="Sedhiou/Goudomp(Kolibantang)">Sedhiou/Goudomp (Kolibantang)</option>
  <option value="Sedhiou/Goudomp(Niagha)">Sedhiou/Goudomp (Niagha)</option>
  <option value="Sedhiou/Goudomp(Simbandi balante)">Sedhiou/Goudomp (Simbandi balante)</option>
  <option value="Sedhiou/Goudomp(Simbandi brassou)">Sedhiou/Goudomp (Simbandi brassou)</option>
  <option value="Sedhiou/Goudomp(Diattacounda)">Sedhiou/Goudomp (Diattacounda)</option>
  <option value="Sedhiou/Goudomp(Samine)">Sedhiou/Goudomp (Samine)</option>
  <option value="Sedhiou/Sedhiou(Bambali)">Sedhiou/Sedhiou (Bambali)</option>
  <option value="Sedhiou/Sedhiou(Diannah ba)">Sedhiou/Sedhiou (Diannah ba)</option>
  <option value="Sedhiou/Sedhiou(Marssassoum)">Sedhiou/Sedhiou (Marssassoum)</option>

  <option value="Tambacounda/Bakel(Ballou)">Tambacounda/Bakel (Ballou)</option>
  <option value="Tambacounda/Bakel(Bele)">Tambacounda/Bakel (Bele)</option>
  <option value="Tambacounda/Bakel(Gabou)">Tambacounda/Bakel (Gabou)</option>
  <option value="Tambacounda/Bakel(Gathiari)">Tambacounda/Bakel (Gathiari)</option>
  <option value="Tambacounda/Bakel(Madina foulbe)">Tambacounda/Bakel (Madina foulbe)</option>
  <option value="Tambacounda/Bakel(Mouderi)">Tambacounda/Bakel (Mouderi)</option>
  <option value="Tambacounda/Bakel(Sadatou)">Tambacounda/Bakel (Sadatou)</option>
  <option value="Tambacounda/Bakel(Sinthiou fissa)">Tambacounda/Bakel (Sinthiou fissa)</option>
  <option value="Tambacounda/Bakel(Toumboura)">Tambacounda/Bakel (Toumboura)</option>
  <option value="Tambacounda/Bakel(Bakel)">Tambacounda/Bakel (Bakel)</option>
  <option value="Tambacounda/Bakel(Diawara)">Tambacounda/Bakel (Diawara)</option>
  <option value="Tambacounda/Bakel(Kidira)">Tambacounda/Bakel (Kidira)</option>
  <option value="Tambacounda/Goudiry(Bala)">Tambacounda/Goudiry (Bala)</option>
  <option value="Tambacounda/Goudiry(Bani israel)">Tambacounda/Goudiry (Bani israel)</option>
  <option value="Tambacounda/Goudiry(Boutoucoufara)">Tambacounda/Goudiry (Boutoucoufara)</option>
  <option value="Tambacounda/Goudiry(Boynguel bamba)">Tambacounda/Goudiry (Boynguel bamba)</option>
  <option value="Tambacounda/Goudiry(Dianke makha)">Tambacounda/Goudiry (Dianke makha)</option>
  <option value="Tambacounda/Goudiry(Dougue)">Tambacounda/Goudiry (Dougue)</option>
  <option value="Tambacounda/Goudiry(Goumbayel)">Tambacounda/Goudiry (Goumbayel)</option>
  <option value="Tambacounda/Goudiry(Koar)">Tambacounda/Goudiry (Koar)</option>
  <option value="Tambacounda/Goudiry(Komoti)">Tambacounda/Goudiry (Komoti)</option>
  <option value="Tambacounda/Goudiry(Koulor)">Tambacounda/Goudiry (Koulor)</option>
  <option value="Tambacounda/Goudiry(Koussan)">Tambacounda/Goudiry (Koussan)</option>
  <option value="Tambacounda/Goudiry(Sinthiou bocar aly)">Tambacounda/Goudiry (Sinthiou bocar aly)</option>
  <option value="Tambacounda/Goudiry(Sinthiou mamadou boubou)">Tambacounda/Goudiry (Sinthiou mamadou boubou)</option>
  <option value="Tambacounda/Goudiry(Goudiry)">Tambacounda/Goudiry (Goudiry)</option>
  <option value="Tambacounda/Goudiry(Kothiary)">Tambacounda/Goudiry (Kothiary)</option>
  <option value="Thies/Mbour(Diass)">Thies/Mbour (Diass)</option>
  <option value="Thies/Mbour(Fissel)">Thies/Mbour (Fissel)</option>
  <option value="Thies/Mbour(Malicounda)">Thies/Mbour (Malicounda)</option>
  <option value="Thies/Mbour(Ndiaganiao)">Thies/Mbour (Ndiaganiao)</option>
  <option value="Thies/Mbour(Ngueniene)">Thies/Mbour (Ngueniene)</option>
  <option value="Thies/Mbour(Sandiara)">Thies/Mbour (Sandiara)</option>
  <option value="Thies/Mbour(Sessene)">Thies/Mbour (Sessene)</option>
  <option value="Thies/Mbour(Sindia)">Thies/Mbour (Sindia)</option>
  <option value="Thies/Mbour(Joal fadiouth)">Thies/Mbour (Joal fadiouth)</option>
  <option value="Thies/Mbour(Mbour)">Thies/Mbour (Mbour)</option>
  <option value="Thies/Mbour(Ngaparou)">Thies/Mbour (Ngaparou)</option>
  <option value="Thies/Mbour(Nguekhokh)">Thies/Mbour (Nguekhokh)</option>
  <option value="Thies/Mbour(Popenguine-ndayane)">Thies/Mbour (Popenguine-ndayane)</option>
  <option value="Thies/Mbour(Saly portudal)">Thies/Mbour (Saly portudal)</option>
  <option value="Thies/Mbour(Somone)">Thies/Mbour (Somone)</option>
  <option value="Thies/Mbour(Thiadiaye)">Thies/Mbour (Thiadiaye)</option>
  <option value="Ziguinchor/Bignona(Balingore)">Ziguinchor/Bignona (Balingore)</option>
  <option value="Ziguinchor/Bignona(Coubalan)">Ziguinchor/Bignona (Coubalan)</option>
  <option value="Ziguinchor/Bignona(Diegoune)">Ziguinchor/Bignona (Diegoune)</option>
  <option value="Ziguinchor/Bignona(Djibidione)">Ziguinchor/Bignona (Djibidione)</option>
  <option value="Ziguinchor/Bignona(Djinaki)">Ziguinchor/Bignona (Djinaki)</option>
  <option value="Ziguinchor/Bignona(Kafountine)">Ziguinchor/Bignona (Kafountine)</option>
  <option value="Ziguinchor/Bignona(Kartiack)">Ziguinchor/Bignona (Kartiack)</option>
  <option value="Ziguinchor/Bignona(Kataba 1)">Ziguinchor/Bignona (Kataba 1)</option>
  <option value="Ziguinchor/Bignona(Mangagoulack)">Ziguinchor/Bignona (Mangagoulack)</option>
  <option value="Ziguinchor/Bignona(Mlomp)">Ziguinchor/Bignona (Mlomp)</option>
  <option value="Ziguinchor/Bignona(Niamone)">Ziguinchor/Bignona (Niamone)</option>
  <option value="Ziguinchor/Bignona(Oulampane)">Ziguinchor/Bignona (Oulampane)</option>
  <option value="Ziguinchor/Bignona(Ouonck)">Ziguinchor/Bignona (Ouonck)</option>
  <option value="Ziguinchor/Bignona(Sindian)">Ziguinchor/Bignona (Sindian)</option>
  <option value="Ziguinchor/Bignona(Suel)">Ziguinchor/Bignona (Suel)</option>
  <option value="Ziguinchor/Bignona(Tenghori)">Ziguinchor/Bignona (Tenghori)</option>
          </select>
        </div>
        <div>
          <label>Ville :</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez une ville</option>
            <option value="Dakar">Dakar</option>
            <option value="Rufisque">Rufisque</option>
            <option value="Thies">Thies</option>
          </select>
        </div>
        <div>
          <label>Nombre de chambres :</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.features.bedrooms}
            onChange={(e) => handleNestedChange(e, "features")}
            required
          />
        </div>
        <div>
          <label>Nombre de salles de bain :</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.features.bathrooms}
            onChange={(e) => handleNestedChange(e, "features")}
            required
          />
        </div>
        <div>
          <label>Images :</label>
          {formData.images.map((image, index) => (
            <div key={index}>
              <input
                type="text"
                value={image}
                placeholder="URL de l'image"
                onChange={(e) => handleImageChange(e, index)}
              />
              <button type="button" onClick={() => handleRemoveImage(index)}>
                Supprimer
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddImage}>
            Ajouter une image
          </button>
        </div>
        <div>
          <label>Description :</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nom de l'agent :</label>
          <input
            type="text"
            name="agentName"
            value={formData.agentName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date d'emménagement :</label>
          <input
            type="date"
            name="moveInDate"
            value={formData.moveInDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddProperty;
