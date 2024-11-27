
document.getElementById("uploadButton").addEventListener("click", async () => {
  const fileInput = document.getElementById("imageUpload");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select an image first!");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);
  console.log(formData)

  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const keywords = ["Cleansers", "Exfoliants", "Toners", "Serums", "Moisturizers", "Sunscreens", "Acne Treatments", "Anti-Aging Products", "Face Masks",
      "Eye Creams", "Spot Treatments", "Hyperpigmentation Treatment"]
    const skincare_data = {
      "Cleansers": [
        {
          "name": "Cetaphil Daily Facial Cleanser",
          "image": "https://www.cetaphil.com/dw/image/v2/BGGN_PRD/on/demandware.static/-/Sites-galderma-us-m-catalog/default/dw93b9d4fe/Daily%20Facial%20Cleanser/052385_DFC_16oz-Front.PNG?sw=900&sh=900&sm=fit&q=85",
          "link": "https://www.cetaphil.com/us/product/daily-facial-cleanser"
        },
        {
          "name": "Neutrogena Deep Clean Facial Cleanser",
          "image": "https://images.ctfassets.net/aub2fvcyp2t8/5KXIqAWEa7r2b6YRyTfEJU/ca4224ef31bcdd285e4c058ae1bb282b/neutrogena-deep-clean-fash-wash-en-in",
          "link": "https://www.neutrogena.in/face/facial-cleansers-and-scrubs/deep-clean-facial-cleanser"
        },
        {
          "name": "Mamaearth Vitamin C Face Wash",
          "image": "https://5.imimg.com/data5/SELLER/Default/2023/3/295464763/RA/ZE/NV/181013390/mamaearth-vitamin-c-turmeric-face-wash-500x500.png",
          "link": "https://mamaearth.in/product/vitamin-c-face-wash-with-vitamin-c-and-turmeric-for-skin-illumination-250ml"
        }
      ],
      "Exfoliants": [
        {
          "name": "The Ordinary Glycolic Acid 7% Toning Solution",
          "image": "https://theordinary.com/dw/image/v2/BFKJ_PRD/on/demandware.static/-/Sites-deciem-master/default/dw8b57fa2b/Images/products/The%20Ordinary/ord-glyc-acid-7pct-100ml-Aug-UPC.png?sw=800&sh=800&sm=fit",
          "link": "https://theordinary.com/en-in/glycolic-acid-7-exfoliating-toner-100418.html"
        },
        {
          "name": "Plum Green Tea Renewed Clarity Night Gel",
          "image": "https://plumgoodness.com/cdn/shop/files/01_962353ff-51cf-4116-9123-582e9aa1bbe3.jpg?v=1732282341&width=900",
          "link": "https://plumgoodness.com/products/green-tea-renewed-clarity-night-gel"
        },
        {
          "name": "Kaya Skin Clinic Daily Exfoliating Scrub",
          "image": "https://www.kaya.in/media/catalog/product/cache/4bffdb0e5cb0703e5476bde8a2e0010a/h/e/hero_14.jpg",
          "link": "https://www.kaya.in/creamy-exfoliating-rinse.html?srsltid=AfmBOord5MZTS64qkZ3ZoSD-aCAHEchqBIslJUpkqCChfuZYlDlnlEbp"
        }
      ],
      "Toners": [
        {
          "name": "Biotique Bio Cucumber Pore Tightening Toner",
          "image": "https://www.biotique.com/cdn/shop/products/Cucumber-120-ml.jpg?v=1671092168",
          "link": "https://www.biotique.com/products/cucumber-pore-tightening-refreshing-toner-120ml?srsltid=AfmBOorCfvAbzJacr0ni2X5x1mEVvY0Wzd1kBl3Jkn1TDeJNt4v72_xy"
        },
        {
          "name": "Plum Green Tea Alcohol-Free Toner",
          "image": "https://plumgoodness.com/cdn/shop/files/01-_1_b5900bce-28c1-47d1-b989-d586dc9d4590.jpg?v=1731043861&width=900",
          "link": "https://plumgoodness.com/products/green-tea-alcohol-free-toner"
        },
        {
          "name": "Lakmé 9 to 5 Matte Moist Clay Toner",
          "image": "https://www.lakmeindia.com/cdn/shop/products/27383_H2_8901030810954_1000x.jpg?v=1611555323",
          "link": "https://www.lakmeindia.com/products/lakme-9to5-moist-matte-mattifying-face-toner-60ml?srsltid=AfmBOooclN8tOuMSllgYI4bP2y63YsYUIWAV23L028Tq9Bffrftyg_Kk"
        }
      ],
      "Serums": [
        {
          "name": "L'Oréal Paris Revitalift 1.5% Hyaluronic Acid Serum",
          "image": "https://m.media-amazon.com/images/I/51dyKxcQAaL._SY450_.jpg",
          "link": "https://www.amazon.in/LOr%C3%A9al-Paris-Revitalift-HYALURONIC-SERUM/dp/B08QSTTSNH/ref=sr_1_1_sspa?adgrpid=139808825167&dib=eyJ2IjoiMSJ9.feFw5vbI293xtEvCHXdIsU6Hl4f3aftuSupwldXBsWKCBSX0wn-SwXhzEshUg4bsL-1yPbNGa1SbEHNNHj-lJ10pUHznL7_pwbTzUVHb651Z8YJNT75oaVl2Ho-uOS4CMiSGBl9G7ZWkorsmppSQ8010wg6ErRFjg8Yop8SXJx4zG8ji2JJ_UB-hfQ1nnohF8_dtdhat-UuOdA23D7HjHz2B0QKlKv-D97UrwkHNwDlmLsE7VHbonz9sZ_C5kInka-L2fR5m6xD7IFtqCWizm0NaD9xJCJg3A-36zIzRsKk.uPZD2i0q3QUwID4aTGmm11zFatWxGtkVRNZblpiWUWw&dib_tag=se&ext_vrnc=hi&hvadid=595624271987&hvdev=c&hvlocphy=9152458&hvnetw=g&hvqmt=b&hvrand=15574588902497538014&hvtargid=kwd-336428130160&hydadcr=22061_1892580&keywords=l+oreal+paris+revitalift+serum&nsdOptOutParam=true&qid=1732717458&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1"
        },
        {
          "name": "Mamaearth Vitamin C Serum",
          "image": "https://images.mamaearth.in/catalog/product/1/0/10_-vit-c-essence-serum-with-ingredients.jpg?format=auto&height=600",
          "link": "https://mamaearth.in/product/10-vitamin-c-face-serum-essence-serum-with-vitamin-c-and-gotu-kola-for-skin-illumination-30ml?srsltid=AfmBOor3A-CJCvpx671SY15rN8KW70GUvpUpa7vUIH_33Psz68zSL3Q7"
        },
        {
          "name": "The Ordinary Niacinamide 10% + Zinc 1%",
          "image": "https://theordinary.com/dw/image/v2/BFKJ_PRD/on/demandware.static/-/Sites-deciem-master/default/dwce8a7cdf/Images/products/The%20Ordinary/rdn-niacinamide-10pct-zinc-1pct-30ml.png?sw=800&sh=800&sm=fit",
          "link": "https://theordinary.com/en-us/niacinamide-10-zinc-1-serum-100436.html"
        }
      ],
      "Moisturizers": [
        {
          "name": "Nivea Soft Light Moisturizer",
          "image": "https://via.placeholder.com/150?text=Nivea+Soft+Light+Moisturizer",
          "link": "https://www.nivea.in/products/soft-light-moisturizer-400590016658802"
        },
        {
          "name": "CeraVe Daily Moisturizing Lotion",
          "image": "https://via.placeholder.com/150?text=CeraVe+Daily+Moisturizing+Lotion",
          "link": "https://www.cerave.com/products/daily-moisturizing-lotion"
        },
        {
          "name": "Himalaya Herbals Nourishing Skin Cream",
          "image": "https://via.placeholder.com/150?text=Himalaya+Herbals+Nourishing+Skin+Cream",
          "link": "https://himalayawellness.in/products/nourishing-skin-cream"
        }
      ],
      "Sunscreens": [
        {
          "name": "La Shield SPF 40 Gel Sunscreen",
          "image": "https://via.placeholder.com/150?text=La+Shield+SPF+40+Gel+Sunscreen",
          "link": "https://www.lashield.com/"
        },
        {
          "name": "Neutrogena UltraSheer Dry-Touch Sunscreen SPF 50+",
          "image": "https://via.placeholder.com/150?text=Neutrogena+UltraSheer+SPF+50",
          "link": "https://www.neutrogena.com/products/sun-care/ultrasheer-dry-touch-sunscreen-spf-50"
        },
        {
          "name": "Mamaearth Ultra Light Sunscreen SPF 50",
          "image": "https://via.placeholder.com/150?text=Mamaearth+Ultra+Light+Sunscreen+SPF+50",
          "link": "https://mamaearth.in/product/ultra-light-sunscreen-spf-50"
        }
      ],
      "Acne Treatments": [
        {
          "name": "Benzac AC Gel 5%",
          "image": "https://via.placeholder.com/150?text=Benzac+AC+Gel+5%",
          "link": "https://www.benzacgel.com/"
        },
        {
          "name": "Himalaya Acne-n-Pimple Cream",
          "image": "https://via.placeholder.com/150?text=Himalaya+Acne-n-Pimple+Cream",
          "link": "https://himalayawellness.in/products/acne-n-pimple-cream"
        },
        {
          "name": "Pond’s Acne Clear White Face Wash",
          "image": "https://via.placeholder.com/150?text=Pond’s+Acne+Clear+White+Face+Wash",
          "link": "https://www.ponds.in/"
        }
      ],
      "Anti-Aging Products": [
        {
          "name": "Olay Regenerist Micro-Sculpting Cream",
          "image": "https://via.placeholder.com/150?text=Olay+Regenerist+Micro-Sculpting+Cream",
          "link": "https://www.olay.com/products/regenerist-micro-sculpting-cream"
        },
        {
          "name": "L'Oréal Paris Revitalift Anti-Wrinkle + Firming Night Cream",
          "image": "https://via.placeholder.com/150?text=L'Oréal+Paris+Revitalift+Anti-Wrinkle",
          "link": "https://www.lorealparisusa.com/products/skin-care/anti-aging/night-creams/revitalift-anti-wrinkle-firming-night-cream"
        },
        {
          "name": "Plum Retinol Face Serum",
          "image": "https://via.placeholder.com/150?text=Plum+Retinol+Face+Serum",
          "link": "https://plumgoodness.com/products/retinol-face-serum"
        }
      ],
      "Face Masks": [
        {
          "name": "The Face Shop Real Nature Face Mask",
          "image": "https://via.placeholder.com/150?text=The+Face+Shop+Real+Nature+Face+Mask",
          "link": "https://www.thefaceshop.in/"
        },
        {
          "name": "Innisfree Super Volcanic Pore Clay Mask",
          "image": "https://via.placeholder.com/150?text=Innisfree+Super+Volcanic+Pore+Clay+Mask",
          "link": "https://www.innisfree.com/in/en/main/index.do"
        },
        {
          "name": "Mamaearth Charcoal Face Mask",
          "image": "https://via.placeholder.com/150?text=Mamaearth+Charcoal+Face+Mask",
          "link": "https://mamaearth.in/product/charcoal-face-mask"
        }
      ],
      "Eye Creams": [
        {
          "name": "Kiehl’s Creamy Eye Treatment with Avocado",
          "image": "https://via.placeholder.com/150?text=Kiehl’s+Creamy+Eye+Treatment+with+Avocado",
          "link": "https://www.kiehls.com/skin-care/eye-care/creamy-eye-treatment-with-avocado/KHL234.html"
        },
        {
          "name": "L'Oréal Paris Revitalift Laser X3 Eye Cream",
          "image": "https://via.placeholder.com/150?text=L'Oréal+Paris+Revitalift+Laser+X3+Eye+Cream",
          "link": "https://www.lorealparisusa.com/products/skin-care/anti-aging/eye-creams/revitalift-laser-x3-eye-cream"
        }
      ],
      "Spot Treatments": [
        {
          "name": "The Ordinary Salicylic Acid 2% Solution",
          "image": "https://via.placeholder.com/150?text=The+Ordinary+Salicylic+Acid+2%+Solution",
          "link": "https://theordinary.deciem.com/product/rdn-salicylic-acid-2pct-30ml"
        },
        {
          "name": "Mamaearth Tea Tree Spot Gel",
          "image": "https://via.placeholder.com/150?text=Mamaearth+Tea+Tree+Spot+Gel",
          "link": "https://mamaearth.in/product/tea-tree-spot-gel"
        },
        {
          "name": "Kiehl’s Breakout Control Targeted Acne Spot Treatment",
          "image": "https://via.placeholder.com/150?text=Kiehl’s+Breakout+Control+Targeted+Acne+Spot+Treatment",
          "link": "https://www.kiehls.com/skin-care/acne-treatments/breakout-control-targeted-acne-spot-treatment/KHL386.html"
        }
      ],
      "Hyperpigmentation Treatment": [
        {
          "name": "Kiehl’s Clearly Corrective Dark Spot Solution",
          "image": "https://via.placeholder.com/150?text=Kiehl’s+Clearly+Corrective+Dark+Spot+Solution",
          "link": "https://www.kiehls.com/skin-care/serums/clearly-corrective-dark-spot-solution/KHL105.html"
        },
        {
          "name": "Plum 15% Vitamin C Face Serum",
          "image": "https://via.placeholder.com/150?text=Plum+15%+Vitamin+C+Face+Serum",
          "link": "https://plumgoodness.com/products/15-vitamin-c-face-serum"
        },
        {
          "name": "Himalaya Clear Complexion Whitening Day Cream",
          "image": "https://via.placeholder.com/150?text=Himalaya+Clear+Complexion+Whitening+Day+Cream",
          "link": "https://himalayawellness.in/products/clear-complexion-whitening-day-cream"
        }
      ]
    };


    //const result = await response.json();
    //   document.getElementById("output").textContent = result.text;
    // Assuming you already have the JSON data in the `result` variable after the fetch
    const result = await response.json();
    console.log("ganja:", result)

    // Get references to the div elements
    const descriptionDiv = document.getElementById('description');
    const routineDiv = document.getElementById('routine');
    const gridDiv = document.getElementById('grid');

    // Update the content of the description div
    descriptionDiv.innerHTML = result.descriptiom; // Corrected typo: 'descriptiom' -> 'description'

    // Update the content of the routine div
    routineDiv.innerHTML = result.routine;

    // Generate content for the grid div (could be a list or something specific based on the keywords)
    gridDiv.innerHTML = `
  <h3>Recommended Products:</h3>
  <ul>
    ${result.keyword.map(item => `<li>${item}</li>`).join('')}
  </ul>
`;


  } catch (error) {
    console.error("Error uploading image:", error);
    document.getElementById("output").textContent = `Error uploading image: ${error.message}`;
  }
});
