import React, { useState } from "react";

export const ProductItemIngredients = () => {
  const [showIngredients, setShowIngredients] = useState(false);

  return (
    <div className="space-y-3 font-urbanist">
      <div>
        <h2 className="text-base font-semibold text-primary md:text-lg">
          Ingredients We Love
        </h2>
        <p className="text-sm text-secondary md:text-base">
          Citrus Tangerina (Tangerine) Extract, Ethyl Ascorbic Acid
        </p>
      </div>

      {showIngredients && (
        <div>
          <h3 className="text-base font-semibold text-primary md:text-lg">
            Full List of Ingredients
          </h3>
          <p className="text-sm text-secondary md:text-base">
            Water, Glycerin, Stearic Acid, Myristic Acid, Potassium Hydroxide,
            Lauric Acid, Palmitic Acid, Cocamidopropyl Betaine, Potassium
            Cocoate, Glyceryl Stearate SE, Butylene Glycol, Coco-Glucoside,
            Citrus Aurantium Dulcis (Orange) Peel Oil, Polyquaternium-7, Sodium
            Chloride, Citrus Limon (Lemon) Peel Oil, Guar Hydroxypropyltrimonium
            Chloride, Sodium Cocoyl Isethionate, Citrus Aurantium Bergamia
            (Bergamot) Fruit Oil, 1,2-Hexanediol, Citric Acid, Sodium Phytate,
            Melia Azadirachta Flower Extract, Sodium Benzoate, Ocimum Sanctum
            Leaf Extract, Melia Azadirachta Leaf Extract, Curcuma Longa
            (Turmeric) Root Extract, Citrus Tangerina (Tangerine) Extract,
            3-O-Ethyl Ascorbic Acid, Niacinamide, Quillaja Saponaria Bark
            Extract, Arbutin, Corallina Officinalis Extract, EDTA,
            Ethylhexylglycerin, Hyaluronic Acid, Hydrolyzed Hyaluronic Acid,
            Sodium Hyaluronate
          </p>
        </div>
      )}

      <button
        onClick={() => setShowIngredients(!showIngredients)}
        className="text-base underline"
      >
        {showIngredients ? "Show Less" : "See all ingredients"}
      </button>
    </div>
  );
};
