
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
          "image": "https://m.media-amazon.com/images/I/313JkNmP1-L._SX300_SY300_QL70_FMwebp_.jpg",
          "link": "https://www.amazon.in/Moisturizer-Non-Greasy-Vitamin-Instant-Hydration/dp/B00E96N6O8?th=1"
        },
        {
          "name": "CeraVe Daily Moisturizing Lotion",
          "image": "https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/products-v3/daily-moisturizing-lotion/700x875/cerave_daily_moisturizing_lotion_12oz_front-700x875-v2.jpg?rev=c1f482b619984b46bd02512590f52dfc&w=500&hash=C099A94A2D66592D4A3463FD54357452",
          "link": "https://www.cerave.com/skincare/moisturizers/daily-moisturizing-lotion"
        },
        {
          "name": "Himalaya Herbals Nourishing Skin Cream",
          "image": "https://himalayawellness.in/cdn/shop/products/nourishing-skin-cream_1800x1800.jpg?v=1622098340",
          "link": "https://himalayawellness.in/products/nourishing-skin-cream?srsltid=AfmBOopKAJNdOv1POZZK8FLugToRwGDM9BI4lE4gVFTJ_e-plDXymMJU"
        }
      ],
      "Sunscreens": [
        {
          "name": "La Shield SPF 40 Gel Sunscreen",
          "image": "https://m.media-amazon.com/images/I/419hcu-yp6L._SX300_SY300_QL70_FMwebp_.jpg",
          "link": "https://www.amazon.in/Shield-Sunscreen-Gel-60/dp/B07KMD8NJ2?th=1"
        },
        {
          "name": "Neutrogena UltraSheer Dry-Touch Sunscreen SPF 50+",
          "image": "https://cdn01.pharmeasy.in/dam/products_otc/O94291/neutrogena-ultra-sheer-dry-touch-sunblock-spf-50-88ml-2-1720504399.jpg",
          "link": "https://www.myntra.com/face-sunscreen/neutrogena/neutrogena-ultrasheer-dry-touch-sunblock---sunscreen-spf-50-with-helioplex---30-g/6967600/buy?utm_source=perf_google_Pmax_perfbpc&utm_medium=perf_google_Pmax&utm_campaign=dms_google_pmax_cpc_Myntra_PMax_BPC_Skincare_SOK_New&keyword=&matchtype=&target=&placement=&gad_source=1&gclid=CjwKCAiAxqC6BhBcEiwAlXp459cWWW8hgw-EdXRz478Y4Bprx9zxTqH72gPfRfqCFKfzgViHoVkCWxoCcVQQAvD_BwE#gad_source_1"
        },
        {
          "name": "Mamaearth Ultra Light Sunscreen SPF 50",
          "image": "https://images.mamaearth.in/catalog/product/1/-/1-with-ingredients_13.jpg?format=auto&height=600",
          "link": "https://mamaearth.in/product/hydragel-indian-sunscreen-with-aloe-vera-raspberry-for-sun-protection-50-g?utm_source=google&utm_medium=cpc&utm_term=154468111135&gad_source=1&gclid=CjwKCAiAxqC6BhBcEiwAlXp45wj9fLWYpWcu6bEvMAF7Y-znLxXhd0VnE0wRtZv-vKPZuxq-AjqTyhoC0-YQAvD_BwE#gad_source_1"
        }
      ],
      "Acne Treatments": [
        {
          "name": "Benzac AC Gel 5%",
          "image": "https://m.media-amazon.com/images/I/51T7V8S1HHL._SX679_.jpg",
          "link": "https://www.amazon.in/BENZAC-AC-5-Tube-Gel/dp/B09V3SXW86"
        },
        {
          "name": "Himalaya Acne-n-Pimple Cream",
          "image": "https://himalayawellness.in/cdn/shop/products/pimple-clear-cream_1800x1800.jpg?v=1622098478",
          "link": "https://himalayawellness.in/products/pimple-clear-cream?srsltid=AfmBOorNf0UIl2i7_POTebtlby3J35S-LJlDmv1JQQ_N_jH5tLDHV5KR"
        },
        {
          "name": "Pond’s Acne Clear White Face Wash",
          "image": "https://ponds.in/cdn/shop/products/12666_S1-8901030861475.jpg?v=1669900448&width=1000",
          "link": "https://ponds.in/products/pimple-clear-germ-removal-facewash?srsltid=AfmBOopZtf7hsau79hbLlY8GvHnvLD8cxXTNh1vq0Imyr81deVDsiUKE&variant=42450340806889"
        }
      ],
      "Anti-Aging Products": [
        {
          "name": "Olay Regenerist Micro-Sculpting Cream",
          "image": "https://cdn11.bigcommerce.com/s-gud7r2x2lu/images/stencil/640w/attribute_rule_images/90_source_1718027485.jpg",
          "link": "https://www.myntra.com/day-cream/olay/olay-regenerist-micro-sculpting-day-cream-with-hyaluronic--niacinamide---50g/10444752/buy?utm_source=perf_google_Pmax_perfbpc&utm_medium=perf_google_Pmax&utm_campaign=dms_google_pmax_cpc_Myntra_PMax_BPC_Skincare_SOK_New&keyword=&matchtype=&target=&placement=&gad_source=1&gclid=CjwKCAiAxqC6BhBcEiwAlXp45_MezndDjgF7pd4nX30M3RobHcOyH-qH53lwU_nv58aYazWsx6ArbhoCBRQQAvD_BwE#gad_source_1"
        },
        {
          "name": "L'Oréal Paris Revitalift Anti-Wrinkle + Firming Night Cream",
          "image": "https://www.cocci.com.ng/cdn/shop/products/lol1.jpg?v=1660578027",
          "link": "https://www.nykaa.com/l-oreal-paris-revitalift-anti-wrinkle-and-firming-night-cream/p/7868407?ptype=product&skuId=7868407&utm_content=ads&utm_source=GooglePaid&utm_medium=PLA&utm_campaign=PLA_Lakme_Maybelline_Loreal&gad_source=1&gclid=CjwKCAiAxqC6BhBcEiwAlXp452D5PpfwGxz0hviY3bgixbetYv61wzq5I_EFDhtrWYoZ8ne-Jup-9hoCYRAQAvD_BwE#gad_source_1"
        },
        {
          "name": "Plum Retinol Face Serum",
          "image": "https://plumgoodness.com/cdn/shop/files/retinol-serum_1080X1080_723d71af-9137-4747-b573-f233978a0f6b.jpg?v=1697793086&width=900",
          "link": "https://plumgoodness.com/products/retinol-face-serum-with-bakuchiol?srsltid=AfmBOopJDc-oqAgaUuw-jdD2Lt--UFGkjEzDuU3wDHnh8TgiDTxeFtVG"
        }
      ],
      "Face Masks": [
        {
          "name": "The Face Shop Real Nature Face Mask",
          "image": "https://thefaceshop.in/cdn/shop/products/MicrosoftTeams-image_2.jpg?v=1661347010&width=1500",
          "link": "https://thefaceshop.in/products/the-face-shop-real-nature-daily-glow-mask-sheet-combo-pack-of-10?variant=41815587356824&country=IN&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&gad_source=1&gclid=CjwKCAiAxqC6BhBcEiwAlXp45-0bAdoCTa63D0MsyeWlV0oARqtUfSO1KJCP3HoE4-3lCOqGoz3ZmBoCdmwQAvD_BwE#gad_source_1"
        },
        {
          "name": "Innisfree Super Volcanic Pore Clay Mask",
          "image": "https://in.innisfree.com/cdn/shop/files/SUPERVOLCANICMASK1.jpg?v=1732604811",
          "link": "https://in.innisfree.com/products/super-volcanic-pore-clay-mask-100ml?srsltid=AfmBOord4nOSDAXxLPKHjShtk_TbhbZSppXaXQ-XCiWXySr4_efCceED"
        },
        {
          "name": "Mamaearth Charcoal Face Mask",
          "image": "https://images.mamaearth.in/catalog/product/1/-/1-with-ingredient.jpg?format=auto&height=600",
          "link": "https://mamaearth.in/product/charcoal-face-pack-100-g?srsltid=AfmBOoodmRBMkrprxwNFCE3wgMpha3_0wfCqFYf9sgcNzT8S_XI4vKww"
        }
      ],
      "Eye Creams": [
        {
          "name": "Kiehl’s Creamy Eye Treatment with Avocado",
          "image": "https://m.media-amazon.com/images/I/61ZlS7A9jAL._SY450_.jpg",
          "link": "https://www.amazon.in/KiehlS-Creamy-Eye-Treatment-Avocado/dp/B008KMZ8FC"
        },
        {
          "name": "L'Oréal Paris Revitalift Laser X3 Eye Cream",
          "image": "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:540/1020815/H-BQm-zFeX-1020815_1.jpg",
          "link": "https://www.tirabeauty.com/product/loreal-paris-revitalift-triple-action-eye-cream-ufuokkqrvnvv?gad_source=1&gclid=CjwKCAiAxqC6BhBcEiwAlXp454AnSXu3UWty4LNEiWFUJbrKGHy2igA7Zmmd1OiDqLHLixuW54Q4KxoCDuUQAvD_BwE#gad_source_1"
        }
      ],
      "Spot Treatments": [
        {
          "name": "The Ordinary Salicylic Acid 2% Solution",
          "image": "https://images-static.nykaa.com/media/catalog/product/6/0/60ee76d769915199581_1.jpg?tr=w-344,h-344,cm-pad_resize",
          "link": "https://www.nykaa.com/the-ordinary-salicylic-acid-2percent-solution/p/5003153"
        },
        {
          "name": "Mamaearth Tea Tree Spot Gel",
          "image": "https://via.placeholder.com/150?text=Mamaearth+Tea+Tree+Spot+Gel",
          "link": "https://m.media-amazon.com/images/I/51Ia7TlBKBS._SY450_.jpg"
        },
        {
          "name": "Kiehl’s Breakout Control Targeted Acne Spot Treatment",
          "image": "https://cdn1.skinsafeproducts.com/photo/1E80C3229AD154/medium_1488296039.jpegjpg?1488296039",
          "link": "https://www.kiehls.com/discontinued-products/breakout-control-targeted-acne-spot-treatment/KHL021.html?srsltid=AfmBOoq-ERqgXp48CBiTaNRsPsaR3U7hJAqn-ma4cCYoPgs4LdscT19N"
               }
      ],
      "Hyperpigmentation Treatment": [
        {
          "name": "Kiehl’s Clearly Corrective Dark Spot Solution",
          "image": "https://www.kiehls.in/media/catalog/product/cache/499a0a72bdcec1cb876f4bd886e1c515/8/4/842-9557534757517-15ml-image1.jpg",
          "link": "https://www.kiehls.in/clearly-corrective-dark-spot-solution.html?srsltid=AfmBOoo-ovGm1CLQR8oq7dVGC3ZC2-K3yJWMVZ-28-64F6F3757RrDHP"
        },
        {
          "name": "Plum 15% Vitamin C Face Serum",
          "image": "https://plumgoodness.com/cdn/shop/files/15_VitaminCFaceSerum_76453834-697d-487a-831d-c745c8910540.webp?v=1713188863&width=900",
          "link": "https://plumgoodness.com/products/vitamin-c-face-serum?srsltid=AfmBOooFTh2ypyLhd8olMyxBsZef55SkXKksKS2MWD5Zb5E7eB06_u6T"
        },
        {
          "name": "Himalaya Clear Complexion Whitening Day Cream",
          "image": "https://himalayawellness.in/cdn/shop/files/Resizepackshots_1800x1800.jpg?v=1725966918",
          "link": "https://himalayawellness.in/products/himalaya-clear-complexion-brightening-day-cream?srsltid=AfmBOopoGO0AhY4QJsTaQnfBByL6I8yGVyvg6BpaqD-hVVmgp6ZOorKt"
        }
      ]
    };


    //const result = await response.json();
    //   document.getElementById("output").textContent = result.text;
    // Assuming you already have the JSON data in the `result` variable after the fetch
    const result = await response.json();
   // console.log("ganja:", result)

    // Get references to the div elements
    const descriptionDiv = document.getElementById('description');
    const routineDiv = document.getElementById('routine');
    const gridDiv = document.getElementById('grid');

    // Update the content of the description div
    descriptionDiv.innerHTML = result.descriptiom; // Corrected typo: 'descriptiom' -> 'description'

    // Update the content of the routine div
    var s=result.keyword[0];
    console.log(s)
    routineDiv.innerHTML = result.routine;
    const keywordArray =s.split("\n");
    console.log(keywordArray)

    // Generate content for the grid div (could be a list or something specific based on the keywords)
    keywordArray.forEach(category => {
      if (skincare_data[category]) {
          skincare_data[category].forEach(product => {
              const card = document.createElement('div');
              card.className = 'card';
              card.innerHTML = `
                <a href="${product.link}" target="_blank">
                  <img src="${product.image}" alt="${product.name}" width="250 px " height="300px">
                  <h3>${product.name}</h3>
                </a>
              `;
              gridDiv.appendChild(card);
          });
      } else {
          console.warn(`Category "${category}" not found in skincare_data.`);
      }
  });


  } catch (error) {
    console.error("Error uploading image:", error);
    document.getElementById("output").textContent = `Error uploading image: ${error.message}`;
  }
});
