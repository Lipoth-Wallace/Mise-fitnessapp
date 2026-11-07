import { parseRecipes } from '../parse'

export default parseRecipes('dinner', `
# Chicken & chorizo traybake | Spanish | 4 | 15 | 40 | Easy | 1 | 🍗 🌶️ 🥔 | 15
Smoky chorizo, crispy potatoes and juicy chicken from one tray.
chicken-thigh 600, chorizo 80, potato 600, red-pepper 300, onion 110, paprika 3, olive-oil 15, parsley 10
- Heat the oven to 200°C. Cut the {potato} into chunks and the {red-pepper} and {onion} into wedges.
- Toss with the {chicken-thigh}, sliced {chorizo}, {paprika} and {olive-oil} in a large tin.
- Roast for 40 minutes, turning once, until the chicken is cooked through (75°C). Scatter with {parsley}.

# Chicken & prawn paella | Spanish | 4 | 15 | 35 | Intermediate | 1 | 🥘 🦐 🍋 | 40
A weeknight paella with saffron-coloured rice, chicken, prawns and peas.
white-rice 300, chicken-thigh 300, prawns 200, chorizo 50, onion 110, red-pepper 150, garlic 9, paprika 3, turmeric 1, chicken-stock 900, peas 100, lemon 30, olive-oil 15
- Brown the diced {chicken-thigh} and {chorizo} in the {olive-oil} in a wide pan.
- Add the {onion}, {red-pepper} and {garlic}; cook 5 minutes, then stir in the {paprika}, {turmeric} and {white-rice}.
- Pour in the {chicken-stock} and simmer without stirring for 18 minutes.
- Press in the {prawns} and {peas}; cook 5 minutes more until the prawns are pink. Serve with {lemon}.

# Mussels with tomato, garlic & chilli | French | 2 | 15 | 12 | Intermediate | 1 | 🦪 🍅 🍞 | 10
Steamed mussels in a spicy tomato sauce with bread for mopping. Use about 1kg in shells.
mussels 400, garlic 9, passata 300, red-chilli 10, olive-oil 10, parsley 10, sourdough 100
- Scrub the {mussels}, discarding any that stay open when tapped.
- Soften the {garlic} and {red-chilli} in the {olive-oil}; add the {passata} and simmer 5 minutes.
- Add the mussels, cover and steam for 4–5 minutes until opened; discard any that stay shut.
- Scatter with {parsley} and serve with {sourdough}.

# Lighter fish pie | British | 4 | 20 | 40 | Intermediate | 0 | 🥧 🐟 🥔 | 200
Haddock, salmon and prawns in a parsley sauce under fluffy mash.
haddock 300, salmon 200, prawns 150, milk 400, butter 20, flour 25, peas 150, parsley 10, potato 900
- Boil the {potato} for 15 minutes; mash with a splash of the {milk}.
- Melt the {butter}, stir in the {flour}, then whisk in the rest of the milk until thick.
- Stir in the cubed {haddock}, {salmon}, the {prawns}, {peas} and {parsley}; tip into a dish.
- Top with mash and bake at 200°C for 25 minutes until golden and bubbling.

# Cottage pie | British | 4 | 20 | 50 | Easy | 0 | 🥧 🥩 🥔 | 25
Rich beef and vegetable mince under a buttery mash crust.
beef-mince 500, onion 110, carrot 200, celery 80, tomato-puree 30, worcestershire 15, veg-stock 300, thyme 1, potato 900, milk 80, butter 20, peas 200
- Brown the {beef-mince}; add the diced {onion}, {carrot} and {celery} and cook 8 minutes.
- Stir in the {tomato-puree}, {worcestershire}, {thyme} and {veg-stock}; simmer 20 minutes.
- Boil and mash the {potato} with the {milk} and {butter}.
- Spoon the mince into a dish, top with mash and bake at 200°C for 25 minutes. Serve with {peas}.

# Shepherd's pie with sweet potato | British | 4 | 20 | 50 | Easy | 0 | 🥧 🐑 🍠 | 30
Lamb mince with rosemary under a sweet potato mash.
lamb-mince 500, onion 110, carrot 200, garlic 6, tomato-puree 30, rosemary 1, chicken-stock 300, sweet-potato 800, butter 10, peas 150
- Brown the {lamb-mince} and pour off excess fat; add the {onion}, {carrot} and {garlic}.
- Stir in the {tomato-puree}, {rosemary} and {chicken-stock}; simmer 20 minutes, adding the {peas} at the end.
- Boil and mash the {sweet-potato} with the {butter}.
- Top the lamb with mash and bake at 200°C for 25 minutes.

# Roast chicken thighs & root veg | British | 4 | 15 | 45 | Easy | 0 | 🍗 🥕 🥔 | 35
A midweek roast: rosemary chicken with parsnips, carrots and sprouts.
chicken-thigh 600, parsnip 300, carrot 300, potato 400, onion 220, rosemary 2, garlic 9, olive-oil 20, brussels 300
- Heat the oven to 200°C. Cut the {parsnip}, {carrot}, {potato} and {onion} into chunks.
- Toss with the {olive-oil}, {rosemary} and whole {garlic} cloves; add the {chicken-thigh} on top.
- Roast for 35 minutes, add the halved {brussels} and roast 10 minutes more until the chicken reaches 75°C.

# Honey-mustard pork with potatoes | British | 4 | 15 | 30 | Easy | 0 | 🐖 🍯 🥔 | 40
Sticky honey-mustard pork fillet with crispy potatoes and green beans.
pork-tenderloin 500, honey 20, dijon 20, potato 600, green-beans 200, olive-oil 15, thyme 1
- Roast the cubed {potato} with the {olive-oil} and {thyme} at 200°C for 30 minutes.
- Brown the {pork-tenderloin}, brush with the {honey} and {dijon}, and roast alongside for 18–20 minutes (to 63°C, then rest).
- Steam the {green-beans}. Slice the pork and serve.

# Beef & barley stew | British | 4 | 20 | 120 | Intermediate | 0 | 🍲 🥩 🌾 | 20
Slow-cooked beef with root veg and pearl barley. Use a stewing cut.
beef-steak 600, pearl-barley 100, onion 220, carrot 300, celery 100, potato 400, tomato-puree 30, veg-stock 1200, thyme 2, worcestershire 15, flour 20, olive-oil 15
- Toss the cubed {beef-steak} in the {flour} and brown in batches in the {olive-oil}.
- Add the {onion}, {carrot} and {celery}; cook 5 minutes, then the {tomato-puree}.
- Add the {veg-stock}, {worcestershire}, {thyme} and rinsed {pearl-barley}; cover and simmer gently for 1½ hours.
- Add the cubed {potato} and cook 30 minutes more until tender.

# Chicken korma | Indian | 4 | 15 | 30 | Easy | 1 | 🍛 🥥 🌰 | 40
A mild, creamy curry with yogurt, coconut and ground almonds.
chicken-breast 600, onion 220, garlic 9, ginger 15, curry-powder 12, turmeric 2, greek-yogurt 200, coconut-milk 200, almonds 40, white-rice 300, coriander 5, olive-oil 15
- Soften the {onion} in the {olive-oil}; add the {garlic}, {ginger}, {curry-powder} and {turmeric}.
- Add the diced {chicken-breast} and brown.
- Stir in the {coconut-milk} and ground {almonds}; simmer 15 minutes until the chicken is cooked through.
- Take off the heat and stir in the {greek-yogurt}. Serve with cooked {white-rice} and {coriander}.

# Butter chicken | Indian | 4 | 20 | 30 | Intermediate | 1 | 🍛 🍗 🧈 | 15
Yogurt-marinated chicken in a buttery, gently spiced tomato sauce.
chicken-thigh 600, greek-yogurt 150, garlic 9, ginger 15, curry-powder 12, paprika 4, passata 400, butter 20, double-cream 100, white-rice 300, coriander 5
- Marinate the diced {chicken-thigh} in the {greek-yogurt}, half the {garlic}, {ginger} and {curry-powder} for 20 minutes.
- Grill or pan-fry until charred.
- Melt the {butter}, add the rest of the garlic, curry powder and the {paprika}, then the {passata}; simmer 10 minutes.
- Add the chicken and {double-cream}; simmer 5 minutes until cooked through. Serve with {white-rice} and {coriander}.

# Lamb rogan josh | Indian | 4 | 20 | 90 | Intermediate | 2 | 🍛 🐑 🌶️ | 5
A deep red, aromatic lamb curry cooked low and slow.
lamb-leg 600, onion 220, garlic 12, ginger 15, curry-powder 12, paprika 5, cinnamon 1, chopped-tomatoes 400, greek-yogurt 100, olive-oil 15, white-rice 300, coriander 5
- Brown the cubed {lamb-leg} in the {olive-oil}; remove.
- Soften the {onion}; add the {garlic}, {ginger}, {curry-powder}, {paprika} and {cinnamon}.
- Return the lamb with the {chopped-tomatoes} and 200ml water; cover and simmer 75 minutes until tender.
- Stir in the {greek-yogurt} off the heat. Serve with {white-rice} and {coriander}.

# Prawn & spinach curry | Indian | 4 | 10 | 20 | Easy | 2 | 🦐 🍛 🥬 | 25
A quick coconut prawn curry, ready in half an hour.
prawns 400, onion 110, garlic 9, ginger 10, curry-powder 10, chopped-tomatoes 400, spinach 200, coconut-milk 200, olive-oil 10, white-rice 240
- Soften the {onion} in the {olive-oil}; add the {garlic}, {ginger} and {curry-powder}.
- Add the {chopped-tomatoes} and {coconut-milk}; simmer 10 minutes.
- Add the {prawns} for 3–4 minutes until pink, then wilt in the {spinach}. Serve with {white-rice}.

# Sweet potato & chickpea dhansak | Indian | 4 | 15 | 35 | Easy | 2 | 🍛 🍠 🫘 | 35
A sweet-sour lentil curry with sweet potato and chickpeas. Plant-based.
red-lentils 150, sweet-potato 500, chickpeas 240, onion 110, garlic 9, ginger 10, curry-powder 12, chopped-tomatoes 400, veg-stock 600, spinach 100, olive-oil 10, brown-rice 240
- Cook the {brown-rice}.
- Soften the {onion} in the {olive-oil}; add the {garlic}, {ginger} and {curry-powder}.
- Add the {red-lentils}, cubed {sweet-potato}, {chopped-tomatoes} and {veg-stock}; simmer 25 minutes.
- Stir in the drained {chickpeas} and {spinach} to warm through.

# Thai green-style chicken curry | Thai | 4 | 20 | 25 | Intermediate | 2 | 🍛 🌿 🥥 | 100
A fresh green curry made from scratch with herbs, ginger and lime.
chicken-thigh 500, coconut-milk 400, green-beans 200, courgette 200, red-chilli 15, garlic 9, ginger 15, coriander 20, lime 30, fish-sauce 20, brown-sugar 5, white-rice 300, basil 10
- Blitz the {red-chilli}, {garlic}, {ginger}, most of the {coriander} and the {lime} to a paste.
- Fry the paste for 2 minutes, add the sliced {chicken-thigh} and brown.
- Add the {coconut-milk}, {green-beans} and {courgette}; simmer 12 minutes until the chicken is cooked through.
- Season with {fish-sauce} and {brown-sugar}; finish with {basil}. Serve with {white-rice}.

# Pad Thai | Thai | 3 | 20 | 12 | Intermediate | 1 | 🍜 🦐 🥜 | 30
Sweet, sour and savoury stir-fried noodles with prawns, tofu and peanuts.
rice-noodles 200, prawns 200, eggs 100, bean-sprouts 150, spring-onion 30, peanuts 40, fish-sauce 20, lime 30, brown-sugar 15, garlic 6, chilli-powder 1, olive-oil 15, tofu 150
- Soak the {rice-noodles} until just soft.
- Mix the {fish-sauce}, {lime}, {brown-sugar} and {chilli-powder}.
- Fry the cubed {tofu} in the {olive-oil}, add the {garlic} and {prawns} until pink, then push aside and scramble the {eggs}.
- Add the noodles and sauce; toss with the {bean-sprouts} and {spring-onion}. Top with crushed {peanuts}.

# Thai basil chicken | Thai | 4 | 10 | 12 | Easy | 3 | 🍗 🌿 🌶️ | 95
Pad kra pao: fiery minced chicken with holy-basil heat and a fried egg.
chicken-mince 500, garlic 12, red-chilli 20, soy-sauce 20, fish-sauce 15, brown-sugar 5, basil 20, green-beans 200, white-rice 300, eggs 200, olive-oil 15
- Cook the {white-rice}.
- Fry the {garlic} and {red-chilli} in half the {olive-oil}; add the {chicken-mince} and cook through.
- Add the chopped {green-beans}, {soy-sauce}, {fish-sauce} and {brown-sugar}; stir-fry 3 minutes, then the {basil}.
- Fry the {eggs} in the rest of the oil and serve on top.

# Thai peanut tofu stir-fry | Thai | 4 | 15 | 15 | Easy | 1 | 🥜 🧈 🥦 | 35
Crispy tofu and veg in a creamy peanut-lime sauce. Plant-based.
tofu 400, peanut-butter 60, soy-sauce 30, lime 30, maple-syrup 15, garlic 6, ginger 10, red-pepper 150, broccoli 250, carrot 120, brown-rice 240, coriander 5, olive-oil 10
- Cook the {brown-rice}.
- Fry the cubed {tofu} in the {olive-oil} until golden; remove.
- Stir-fry the {broccoli}, {red-pepper} and {carrot} with the {garlic} and {ginger}.
- Whisk the {peanut-butter}, {soy-sauce}, {lime}, {maple-syrup} and water; add with the tofu. Top with {coriander}.

# Sweet & sour chicken | Chinese | 4 | 15 | 15 | Easy | 0 | 🍍 🍗 🫑 | 25
Better than a takeaway, with juicy pineapple and peppers.
chicken-breast 500, pineapple 250, red-pepper 150, onion 110, ketchup 60, soy-sauce 20, red-wine-vinegar 30, brown-sugar 20, cornflour 20, olive-oil 15, white-rice 300
- Toss the diced {chicken-breast} in half the {cornflour}; fry in the {olive-oil} until golden and cooked through.
- Add the {onion}, {red-pepper} and {pineapple}; stir-fry 3 minutes.
- Mix the {ketchup}, {soy-sauce}, {red-wine-vinegar}, {brown-sugar}, the rest of the cornflour and 100ml water; add and bubble until glossy.
- Serve with {white-rice}.

# Kung pao chicken | Chinese | 4 | 15 | 12 | Intermediate | 2 | 🍗 🥜 🌶️ | 10
Sichuan-style chicken with peanuts, chilli and a tangy-sweet sauce.
chicken-thigh 500, peanuts 60, red-chilli 15, garlic 9, ginger 10, soy-sauce 30, red-wine-vinegar 15, honey 15, cornflour 10, spring-onion 30, red-pepper 150, olive-oil 15, white-rice 300
- Toss the diced {chicken-thigh} in the {cornflour} and half the {soy-sauce}.
- Stir-fry in the {olive-oil} until cooked through; add the {red-chilli}, {garlic}, {ginger} and {red-pepper}.
- Add the rest of the soy, the {red-wine-vinegar} and {honey}; toss with the {peanuts} and {spring-onion}.
- Serve with {white-rice}.

# Char siu-style pork with pak choi | Chinese | 4 | 15 | 25 | Intermediate | 0 | 🐖 🥬 🍚 | 0
Sticky hoisin-glazed pork with garlicky greens and rice.
pork-tenderloin 500, hoisin 60, honey 20, soy-sauce 20, garlic 6, pak-choi 400, white-rice 300, sesame-oil 5
- Mix the {hoisin}, {honey}, {soy-sauce} and half the {garlic}; coat the {pork-tenderloin}.
- Roast at 200°C for 20–25 minutes, basting once, until cooked through (63°C, then rest).
- Stir-fry the {pak-choi} with the rest of the garlic in the {sesame-oil}.
- Slice the pork and serve with greens and {white-rice}.

# Steamed ginger & spring onion cod | Chinese | 4 | 10 | 12 | Easy | 0 | 🐟 🫚 🥬 | 180
Delicate steamed fish finished with sizzling ginger and spring onion oil.
cod 480, ginger 20, spring-onion 40, soy-sauce 30, sesame-oil 10, pak-choi 300, white-rice 240
- Cook the {white-rice}.
- Steam the {cod} on a plate over simmering water for 8–10 minutes, adding the {pak-choi} for the last 3.
- Top with shredded {ginger} and {spring-onion}; pour over sizzling-hot {sesame-oil} and the {soy-sauce}.

# Mapo tofu with pork | Chinese | 4 | 10 | 15 | Intermediate | 3 | 🌶️ 🧈 🍚 | 0
Silky tofu in a fiery, savoury pork sauce. Miso stands in for broad bean paste.
silken-tofu 400, pork-mince 200, garlic 9, ginger 10, chilli-powder 4, soy-sauce 30, miso 20, chicken-stock 250, cornflour 10, spring-onion 20, white-rice 240, sesame-oil 5
- Brown the {pork-mince} in the {sesame-oil}; add the {garlic}, {ginger}, {chilli-powder} and {miso}.
- Add the {chicken-stock} and {soy-sauce}; slide in the cubed {silken-tofu} and simmer gently 5 minutes.
- Thicken with the {cornflour} mixed with water. Top with {spring-onion}; serve with {white-rice}.

# Bulgogi beef | Korean | 4 | 20 | 10 | Intermediate | 0 | 🥩 🍐 🍚 | 20
Thin beef marinated in pear, soy and garlic, seared fast and hot.
flank-steak 500, soy-sauce 40, pear 89, honey 15, garlic 12, ginger 10, sesame-oil 10, sesame-seeds 5, spring-onion 30, white-rice 300, cucumber 150
- Grate the {pear}, {garlic} and {ginger}; mix with the {soy-sauce}, {honey} and {sesame-oil}.
- Slice the {flank-steak} very thinly and marinate for 15 minutes.
- Sear in batches in a very hot pan for 2 minutes. Serve with {white-rice}, sliced {cucumber}, {spring-onion} and {sesame-seeds}.

# Spicy Korean chicken stir-fry | Korean | 4 | 15 | 20 | Intermediate | 3 | 🍗 🌶️ 🥬 | 5
Dakgalbi-style chicken with cabbage and sweet potato in a hot, sweet sauce.
chicken-thigh 600, chilli-powder 6, soy-sauce 30, honey 20, garlic 12, ginger 10, cabbage 300, sweet-potato 300, onion 110, sesame-oil 10, white-rice 300
- Mix the {chilli-powder}, {soy-sauce}, {honey}, {garlic} and {ginger}; coat the diced {chicken-thigh}.
- Fry the thinly sliced {sweet-potato} in the {sesame-oil} for 5 minutes.
- Add the chicken, {onion} and shredded {cabbage}; stir-fry 12 minutes until the chicken is cooked through. Serve with {white-rice}.

# Bibimbap-style beef bowl | Korean | 4 | 25 | 15 | Intermediate | 1 | 🍚 🍳 🥕 | 15
Rice topped with seasoned veg, beef and a fried egg. Mix it all together.
beef-mince 300, spinach 200, carrot 150, courgette 200, bean-sprouts 150, eggs 200, white-rice 300, soy-sauce 30, sesame-oil 15, chilli-powder 2, honey 10, sesame-seeds 5
- Cook the {white-rice}.
- Separately stir-fry the julienned {carrot}, {courgette}, {bean-sprouts} and {spinach} in a little {sesame-oil}.
- Brown the {beef-mince} with half the {soy-sauce}.
- Mix the rest of the soy with the {chilli-powder} and {honey}. Fry the {eggs}. Build bowls and top with {sesame-seeds} and the sauce.

# Chicken katsu curry | Japanese | 4 | 25 | 40 | Intermediate | 1 | 🍛 🍗 🍚 | 35
Crispy baked chicken cutlets with a mild Japanese-style curry sauce.
chicken-breast 500, flour 30, eggs 50, sourdough 60, curry-powder 10, onion 110, carrot 120, potato 200, veg-stock 500, honey 10, white-rice 300, olive-oil 20
- Blitz the {sourdough} to crumbs. Dust the flattened {chicken-breast} in some of the {flour}, dip in beaten {eggs} and coat in crumbs.
- Drizzle with half the {olive-oil} and bake at 220°C for 20 minutes until cooked through.
- Soften the {onion}, {carrot} and {potato} in the rest of the oil; add the {curry-powder} and remaining flour, then the {veg-stock} and {honey}. Simmer 20 minutes and blend.
- Serve sliced chicken with {white-rice} and the sauce.

# Salmon teriyaki with greens | Japanese | 4 | 10 | 15 | Easy | 0 | 🍣 🥦 🍚 | 20
Glazed salmon fillets with broccoli and pak choi.
salmon 480, soy-sauce 40, honey 25, ginger 10, garlic 6, broccoli 300, pak-choi 200, white-rice 240, sesame-seeds 5
- Mix the {soy-sauce}, {honey}, {ginger} and {garlic}.
- Pan-fry the {salmon} for 4 minutes a side, add the sauce and bubble until glossy.
- Steam the {broccoli} and {pak-choi}. Serve with {white-rice} and {sesame-seeds}.

# Miso-glazed aubergine with edamame rice | Japanese | 4 | 10 | 30 | Easy | 0 | 🍆 🍚 🫛 | 290
Meltingly soft roast aubergine with a sweet miso glaze. Plant-based.
aubergine 600, miso 40, maple-syrup 15, sesame-oil 15, sesame-seeds 5, spring-onion 20, edamame 200, brown-rice 240
- Halve and score the {aubergine}; brush with the {sesame-oil} and roast cut-side down at 200°C for 20 minutes.
- Mix the {miso} and {maple-syrup}; spread on the cut sides and grill for 5 minutes.
- Cook the {brown-rice}, adding the {edamame} for the last 4 minutes. Top with {sesame-seeds} and {spring-onion}.

# Pork yakisoba | Japanese | 4 | 15 | 12 | Easy | 0 | 🍜 🐖 🥬 | 30
Stir-fried noodles with pork and cabbage in a tangy sauce.
soba 250, pork-tenderloin 300, cabbage 200, carrot 120, onion 110, worcestershire 30, soy-sauce 20, ketchup 20, olive-oil 15, spring-onion 20
- Cook the {soba}; rinse.
- Stir-fry the thinly sliced {pork-tenderloin} in the {olive-oil} until cooked through.
- Add the {onion}, {carrot} and {cabbage}; cook 4 minutes.
- Add the noodles with the {worcestershire}, {soy-sauce} and {ketchup}; toss. Top with {spring-onion}.

# Chicken fajitas | Mexican | 4 | 15 | 15 | Easy | 2 | 🌮 🫑 🍗 | 20
Sizzling spiced chicken and peppers with all the trimmings.
chicken-breast 500, red-pepper 300, onion 220, paprika 4, cumin 3, chilli-powder 3, garlic 6, lime 30, olive-oil 15, flour-tortilla 496, sour-cream 100, salsa 150, cheddar 60
- Toss the sliced {chicken-breast}, {red-pepper} and {onion} with the {paprika}, {cumin}, {chilli-powder}, {garlic}, {lime} and {olive-oil}.
- Fry over a high heat for 10–12 minutes until charred and cooked through.
- Serve in warm {flour-tortilla}s with {sour-cream}, {salsa} and grated {cheddar}.

# Beef enchiladas | Mexican | 4 | 20 | 40 | Intermediate | 2 | 🌯 🥩 🧀 | 10
Tortillas rolled around beef and beans, baked under tomato sauce and cheese.
beef-mince 400, onion 110, kidney-beans 240, passata 500, cumin 3, chilli-powder 4, garlic 6, flour-tortilla 372, cheddar 100, coriander 5
- Brown the {beef-mince} with the {onion} and {garlic}; add the {cumin}, half the {chilli-powder}, the drained {kidney-beans} and 150g of the {passata}.
- Roll the filling in the {flour-tortilla}s and lay in a dish.
- Mix the rest of the passata and chilli; pour over and top with {cheddar}.
- Bake at 190°C for 25 minutes. Scatter with {coriander}.

# Fish tacos with lime slaw | Mexican | 4 | 15 | 12 | Easy | 1 | 🌮 🐟 🥑 | 190
Spiced cod in warm corn tortillas with crunchy slaw and avocado.
cod 480, paprika 2, cumin 1, lime 30, olive-oil 10, corn-tortilla 208, cabbage 200, greek-yogurt 100, coriander 10, avocado 150, red-chilli 10
- Rub the {cod} with the {paprika}, {cumin} and {olive-oil}; grill for 8–10 minutes until it flakes.
- Toss the shredded {cabbage} with half the {lime} and the {coriander}.
- Mix the {greek-yogurt} with the rest of the lime and the chopped {red-chilli}.
- Fill the warm {corn-tortilla}s with fish, slaw, sliced {avocado} and the sauce.

# Turkey-stuffed peppers | American | 4 | 15 | 40 | Easy | 0 | 🫑 🍚 🧀 | 10
Roasted peppers filled with spiced turkey, rice and tomato.
red-pepper 600, turkey-mince 400, brown-rice 120, onion 110, garlic 6, cumin 2, chopped-tomatoes 400, cheddar 60, parsley 5, olive-oil 10
- Cook the {brown-rice}. Halve and deseed the {red-pepper}s.
- Brown the {turkey-mince} with the {onion} and {garlic} in the {olive-oil}; add the {cumin} and {chopped-tomatoes} and simmer 10 minutes. Stir in the rice.
- Fill the peppers, top with {cheddar} and bake at 190°C for 30 minutes. Scatter with {parsley}.

# Sweet potato & black bean chilli | Mexican | 4 | 15 | 40 | Easy | 2 | 🌶️ 🍠 🫘 | 10
A rich, smoky plant-based chilli.
sweet-potato 500, black-beans 480, kidney-beans 240, onion 110, red-pepper 150, garlic 9, cumin 4, chilli-powder 4, paprika 3, chopped-tomatoes 800, cocoa 5, olive-oil 15, brown-rice 240
- Soften the {onion} and {red-pepper} in the {olive-oil}; add the {garlic}, {cumin}, {chilli-powder} and {paprika}.
- Add the cubed {sweet-potato}, {chopped-tomatoes} and {cocoa}; simmer 25 minutes.
- Stir in the drained {black-beans} and {kidney-beans}; cook 10 minutes. Serve with {brown-rice}.

# Spaghetti carbonara | Italian | 4 | 10 | 15 | Intermediate | 0 | 🍝 🥓 🧀 | 45
The real thing: eggs, cheese and pepper. No cream.
pasta 320, bacon 150, eggs 150, parmesan 60, black-pepper 2, garlic 3
- Cook the {pasta}.
- Fry the chopped {bacon} with the {garlic} until crisp.
- Beat the {eggs} with the grated {parmesan} and plenty of {black-pepper}.
- Off the heat, toss the drained pasta with the bacon, then the egg mixture and a splash of pasta water until silky.

# Pasta puttanesca | Italian | 4 | 10 | 20 | Easy | 1 | 🍝 🫒 🐟 | 0
Punchy store-cupboard pasta with olives, capers and anchovies.
pasta 320, chopped-tomatoes 400, olives 80, capers 20, anchovies 20, garlic 9, chilli-powder 1, olive-oil 15, parsley 10
- Fry the {garlic}, {anchovies} and {chilli-powder} in the {olive-oil} until the anchovies melt.
- Add the {chopped-tomatoes}, {olives} and {capers}; simmer 15 minutes.
- Toss with the cooked {pasta} and {parsley}.

# Chicken cacciatore with polenta | Italian | 4 | 15 | 45 | Easy | 0 | 🍗 🍅 🌽 | 15
Hunter's-style chicken braised with peppers, mushrooms and olives.
chicken-thigh 600, onion 110, red-pepper 150, mushrooms 200, garlic 9, chopped-tomatoes 400, olives 50, rosemary 1, olive-oil 15, polenta 200
- Brown the {chicken-thigh} in the {olive-oil}; remove.
- Soften the {onion}, {red-pepper}, {mushrooms} and {garlic}; add the {chopped-tomatoes}, {rosemary} and {olives}.
- Return the chicken, cover and simmer 35 minutes until cooked through.
- Whisk the {polenta} into 800ml simmering water and cook 5 minutes until thick.

# Mushroom & barley risotto | Italian | 4 | 10 | 45 | Easy | 0 | 🍄 🌾 🧀 | 30
An orzotto: nutty pearl barley cooked risotto-style with mushrooms.
pearl-barley 300, mushrooms 400, onion 110, garlic 6, veg-stock 1200, thyme 1, parmesan 50, butter 15, parsley 10
- Fry the sliced {mushrooms} in the {butter} until golden; set aside half.
- Add the {onion}, {garlic}, {thyme} and rinsed {pearl-barley}.
- Add the {veg-stock} a ladle at a time over 40 minutes, stirring, until tender.
- Stir in the {parmesan}; top with the reserved mushrooms and {parsley}.

# Lighter beef lasagne | Italian | 6 | 30 | 60 | Intermediate | 0 | 🍝 🥩 🧀 | 10
Layers of lean beef ragù, white sauce and pasta.
beef-mince 500, onion 110, carrot 120, garlic 9, chopped-tomatoes 800, tomato-puree 30, oregano 2, pasta 250, milk 600, butter 30, flour 35, nutmeg 0.5, mozzarella 125, parmesan 30
- Brown the {beef-mince} with the {onion}, {carrot} and {garlic}; add the {chopped-tomatoes}, {tomato-puree} and {oregano} and simmer 25 minutes.
- Melt the {butter}, stir in the {flour}, then whisk in the {milk} and {nutmeg} until thick.
- Layer ragù, {pasta} sheets and white sauce three times; top with {mozzarella} and {parmesan}.
- Bake at 190°C for 40 minutes; rest 10 minutes before cutting.

# Pesto salmon with roast tomatoes | Italian | 4 | 10 | 25 | Easy | 0 | 🍣 🍅 🌿 | 100
Pesto-crusted salmon on a tray of tomatoes, potatoes and beans.
salmon 480, pesto 60, tomato 300, potato 600, green-beans 200, olive-oil 10
- Roast the halved {potato} with the {olive-oil} at 200°C for 15 minutes.
- Add the {tomato}, the {salmon} spread with {pesto}, and the {green-beans}.
- Roast 12–14 minutes more until the salmon flakes.

# Aubergine parmigiana | Italian | 4 | 20 | 50 | Intermediate | 0 | 🍆 🧀 🍅 | 0
Layers of roasted aubergine, tomato, basil and mozzarella.
aubergine 900, passata 700, garlic 6, basil 15, mozzarella 250, parmesan 50, olive-oil 30, sourdough 200
- Slice the {aubergine}, brush with the {olive-oil} and roast at 200°C for 20 minutes.
- Simmer the {passata} with the {garlic} and most of the {basil} for 10 minutes.
- Layer aubergine, sauce, torn {mozzarella} and {parmesan} in a dish; bake for 30 minutes.
- Serve with {sourdough}.

# Cod with chorizo & butter beans | Spanish | 4 | 10 | 20 | Easy | 1 | 🐟 🌶️ 🫘 | 15
Flaky cod on smoky beans with spinach. One pan.
cod 480, chorizo 60, butter-beans 480, chopped-tomatoes 400, garlic 6, paprika 2, spinach 100, olive-oil 10, parsley 5, sourdough 160
- Fry the diced {chorizo} in the {olive-oil}; add the {garlic} and {paprika}.
- Add the {chopped-tomatoes} and drained {butter-beans}; simmer 8 minutes, then stir in the {spinach}.
- Nestle in the {cod}, cover and cook 8–10 minutes until it flakes. Scatter with {parsley}; serve with toasted {sourdough}.

# Greek lamb meatballs with feta | Greek | 4 | 20 | 25 | Easy | 0 | 🧆 🍅 🧀 | 5
Oregano lamb meatballs in tomato sauce, finished with feta.
lamb-mince 500, onion 55, garlic 6, oregano 2, mint 5, passata 500, feta 100, olive-oil 10, couscous 240
- Mix the {lamb-mince} with grated {onion}, half the {garlic}, the {oregano} and {mint}; roll 20 balls.
- Brown in the {olive-oil}; add the {passata} and the rest of the garlic and simmer 15 minutes until cooked through.
- Crumble over the {feta}. Serve with {couscous} soaked in boiling water.

# Lighter moussaka | Greek | 4 | 30 | 70 | Advanced | 0 | 🍆 🐑 🧀 | 25
Spiced lamb and aubergine under a set yogurt topping.
aubergine 600, lamb-mince 500, onion 110, garlic 9, cinnamon 1, oregano 2, chopped-tomatoes 400, greek-yogurt 300, eggs 100, parmesan 40, olive-oil 15
- Slice the {aubergine}, brush with the {olive-oil} and roast at 200°C for 20 minutes.
- Brown the {lamb-mince} with the {onion} and {garlic}; add the {cinnamon}, {oregano} and {chopped-tomatoes}; simmer 20 minutes.
- Layer the lamb and aubergine in a dish.
- Beat the {greek-yogurt}, {eggs} and half the {parmesan}; spread on top, sprinkle with the rest and bake 35 minutes.

# Chicken souvlaki traybake | Greek | 4 | 15 | 40 | Easy | 0 | 🍗 🥔 🍋 | 50
Lemon-oregano chicken and potatoes with cool tzatziki.
chicken-thigh 600, potato 700, lemon 45, oregano 3, garlic 9, olive-oil 25, greek-yogurt 150, cucumber 150
- Toss the {chicken-thigh} and wedged {potato} with the {lemon}, {oregano}, most of the {garlic} and {olive-oil}.
- Roast at 200°C for 40 minutes until golden and cooked through.
- Grate the {cucumber} into the {greek-yogurt} with the rest of the garlic.

# Lamb-stuffed aubergines | Middle Eastern | 4 | 20 | 45 | Intermediate | 0 | 🍆 🐑 🌰 | 280
Roasted aubergine halves filled with spiced lamb and pine nuts.
aubergine 600, lamb-mince 400, onion 110, garlic 6, cinnamon 1, cumin 2, chopped-tomatoes 400, pine-nuts 30, parsley 10, greek-yogurt 100, olive-oil 15, bulgur 160
- Halve the {aubergine}s, scoop out some flesh, brush with the {olive-oil} and roast at 200°C for 20 minutes.
- Brown the {lamb-mince} with the {onion}, {garlic}, chopped aubergine flesh, {cinnamon} and {cumin}; add the {chopped-tomatoes} and simmer 10 minutes.
- Fill the aubergines and bake 20 minutes. Top with toasted {pine-nuts}, {parsley} and {greek-yogurt}.
- Serve with {bulgur} soaked in boiling water.

# Chicken & apricot tagine | Middle Eastern | 4 | 15 | 45 | Easy | 1 | 🍲 🍑 🍗 | 30
Sweet-spiced chicken with apricots and chickpeas over couscous.
chicken-thigh 600, onion 220, garlic 9, ginger 10, cumin 3, cinnamon 2, turmeric 1, chopped-tomatoes 400, chickpeas 240, dried-apricots 80, chicken-stock 400, coriander 10, couscous 240, olive-oil 15
- Brown the {chicken-thigh} in the {olive-oil}; remove.
- Soften the {onion}; add the {garlic}, {ginger}, {cumin}, {cinnamon} and {turmeric}.
- Return the chicken with the {chopped-tomatoes}, {chicken-stock}, {chickpeas} and {dried-apricots}; simmer 35 minutes.
- Serve over {couscous} soaked in boiling water, with {coriander}.

# Spiced salmon with herby bulgur | Middle Eastern | 4 | 15 | 15 | Easy | 0 | 🍣 🌿 🍋 | 130
Cumin-crusted salmon with a jewelled herb and pomegranate bulgur.
salmon 480, cumin 2, paprika 2, olive-oil 10, bulgur 240, parsley 20, mint 10, lemon 30, pomegranate 80, cucumber 150
- Rub the {salmon} with the {cumin}, {paprika} and {olive-oil}; roast at 200°C for 12–14 minutes.
- Soak the {bulgur} in boiling water for 10 minutes; drain.
- Toss with chopped {parsley}, {mint}, diced {cucumber}, {pomegranate} and {lemon}.

# Mushroom & lentil cottage pie | British | 4 | 20 | 50 | Easy | 0 | 🥧 🍄 🥔 | 30
A plant-based cottage pie with a rich mushroom and lentil base.
red-lentils 200, mushrooms 400, onion 110, carrot 200, celery 80, garlic 6, tomato-puree 30, veg-stock 600, thyme 1, potato 900, soy-milk 100, olive-oil 15
- Soften the {onion}, {carrot}, {celery} and chopped {mushrooms} in the {olive-oil}; add the {garlic}.
- Add the {red-lentils}, {tomato-puree}, {thyme} and {veg-stock}; simmer 20 minutes.
- Boil and mash the {potato} with the {soy-milk}.
- Top the filling with mash and bake at 200°C for 25 minutes.

# Oven fish & chips | British | 4 | 20 | 35 | Easy | 0 | 🐟 🍟 🍋 | 210
Crumbed haddock and crispy oven chips with peas.
haddock 480, flour 30, eggs 50, sourdough 80, potato 900, olive-oil 25, peas 300, lemon 30
- Cut the {potato} into chips, toss with most of the {olive-oil} and roast at 220°C for 35 minutes.
- Blitz the {sourdough} to crumbs. Dust the {haddock} in {flour}, dip in beaten {eggs} and coat in crumbs.
- Drizzle with the rest of the oil and bake for the last 15 minutes until cooked through.
- Serve with {peas} and {lemon}.

# Chicken, leek & mushroom pie | British | 4 | 20 | 45 | Intermediate | 0 | 🥧 🍗 🍄 | 40
A creamy pie filling under mashed potato instead of pastry.
chicken-breast 600, leek 300, mushrooms 250, milk 400, butter 20, flour 30, chicken-stock 300, thyme 1, potato 900, dijon 10
- Brown the diced {chicken-breast}; add the sliced {leek} and {mushrooms} and cook 5 minutes.
- Stir in the {butter} and {flour}, then the {chicken-stock}, 300ml of the {milk}, {thyme} and {dijon}; simmer 10 minutes.
- Boil and mash the {potato} with the rest of the milk.
- Top the filling with mash and bake at 200°C for 25 minutes.

# Steak with sweet potato wedges | American | 4 | 10 | 35 | Easy | 0 | 🥩 🍠 🥦 | 20
Garlicky steak with smoky wedges and buttery broccoli.
beef-steak 600, sweet-potato 800, paprika 3, olive-oil 15, broccoli 300, garlic 6, black-pepper 2, butter 10
- Toss the {sweet-potato} wedges with the {paprika} and most of the {olive-oil}; roast at 220°C for 35 minutes.
- Season the {beef-steak} with {black-pepper}; sear 3–4 minutes a side, add the {butter} and {garlic} and baste. Rest 5 minutes.
- Steam the {broccoli}.

# Smoky chicken drumsticks & slaw | American | 4 | 15 | 40 | Easy | 0 | 🍗 🌽 🥗 | 20
Sticky BBQ-style drumsticks with corn and a creamy slaw.
chicken-drumstick 1000, paprika 5, brown-sugar 10, garlic 6, ketchup 40, worcestershire 15, sweetcorn 300, cabbage 300, carrot 200, greek-yogurt 100, dijon 10, olive-oil 10
- Mix the {paprika}, {brown-sugar}, {garlic}, {ketchup}, {worcestershire} and {olive-oil}; coat the {chicken-drumstick}s.
- Roast at 200°C for 40 minutes until cooked through (75°C at the bone).
- Shred the {cabbage} and {carrot}; dress with the {greek-yogurt} and {dijon}.
- Cook the {sweetcorn} and serve alongside.

# Turkey burgers & sweet potato fries | American | 4 | 20 | 30 | Easy | 0 | 🍔 🍠 🥬 | 25
Juicy turkey burgers in toasted muffins with oven fries.
turkey-mince 500, onion 55, garlic 6, paprika 2, eggs 50, english-muffin 228, lettuce 80, tomato 150, sweet-potato 600, olive-oil 15, ketchup 40
- Cut the {sweet-potato} into fries, toss with the {olive-oil} and roast at 220°C for 30 minutes.
- Mix the {turkey-mince}, grated {onion}, {garlic}, {paprika} and {eggs}; shape 4 burgers.
- Grill for 6–7 minutes a side until cooked through.
- Serve in toasted {english-muffin}s with {lettuce}, {tomato} and {ketchup}.

# Broccoli mac & cheese | American | 4 | 10 | 30 | Easy | 0 | 🧀 🍝 🥦 | 45
A proper cheesy bake with broccoli folded through.
pasta 300, milk 600, butter 25, flour 30, cheddar 150, dijon 10, broccoli 300, parmesan 20
- Cook the {pasta}, adding the {broccoli} for the last 3 minutes.
- Melt the {butter}, stir in the {flour}, then whisk in the {milk} until thick; add most of the {cheddar} and the {dijon}.
- Combine, tip into a dish, top with the rest of the cheddar and the {parmesan}, and grill until bubbling.

# Cajun jambalaya | American | 4 | 15 | 35 | Intermediate | 2 | 🥘 🦐 🌶️ | 15
Louisiana-style rice with chicken, chorizo and prawns.
chicken-thigh 400, chorizo 80, prawns 200, onion 110, red-pepper 150, celery 80, garlic 9, paprika 4, thyme 1, chilli-powder 2, chopped-tomatoes 400, white-rice 300, chicken-stock 800, olive-oil 10
- Brown the diced {chicken-thigh} and {chorizo} in the {olive-oil}.
- Add the {onion}, {red-pepper}, {celery} and {garlic}; cook 5 minutes with the {paprika}, {thyme} and {chilli-powder}.
- Add the {white-rice}, {chopped-tomatoes} and {chicken-stock}; cover and simmer 20 minutes.
- Stir in the {prawns} and cook 5 minutes until pink.

# Caribbean coconut fish curry | Caribbean | 4 | 15 | 20 | Easy | 2 | 🐟 🥥 🌶️ | 35
Flaky white fish in a thyme-scented coconut curry with rice and peas.
cod 480, coconut-milk 400, onion 110, red-pepper 150, garlic 9, ginger 10, thyme 1, curry-powder 8, red-chilli 10, lime 30, white-rice 300, kidney-beans 240, spring-onion 20
- Soften the {onion}, {red-pepper}, {garlic}, {ginger} and {red-chilli}; add the {curry-powder} and {thyme}.
- Add the {coconut-milk}; simmer 8 minutes, then add the {cod} chunks for 6 minutes until it flakes. Finish with {lime}.
- Cook the {white-rice} with the drained {kidney-beans}; top with {spring-onion}.

# Vietnamese caramel chicken | Vietnamese | 4 | 10 | 25 | Easy | 1 | 🍗 🍚 🌿 | 30
Chicken thighs glazed in a dark caramel, fish sauce and black pepper sauce.
chicken-thigh 600, fish-sauce 30, brown-sugar 25, garlic 12, ginger 10, black-pepper 2, spring-onion 30, white-rice 300, cucumber 150, coriander 10, red-chilli 10, olive-oil 10
- Melt the {brown-sugar} in a pan until dark amber; carefully add 3 tbsp water and the {fish-sauce}.
- Add the {olive-oil}, {garlic}, {ginger} and diced {chicken-thigh}; simmer 20 minutes until sticky and cooked through.
- Season with {black-pepper}; top with {spring-onion}, {red-chilli} and {coriander}. Serve with {white-rice} and sliced {cucumber}.

# Garlic butter steak & asparagus | French | 2 | 5 | 12 | Easy | 0 | 🥩 🌿 🧈 | 15
A low-carb steak dinner basted in thyme and garlic butter.
beef-steak 500, butter 30, garlic 9, thyme 1, asparagus 400, olive-oil 10
- Sear the {beef-steak} in the {olive-oil} for 3–4 minutes a side.
- Add the {butter}, crushed {garlic} and {thyme}; baste for 1 minute, then rest.
- Fry the {asparagus} in the same pan for 4 minutes.

# Creamy Tuscan chicken | Italian | 4 | 10 | 20 | Easy | 0 | 🍗 🍅 🥬 | 25
Chicken in a creamy sauce with sun-dried tomatoes and spinach.
chicken-breast 600, double-cream 150, sun-dried-tomatoes 60, spinach 150, garlic 9, parmesan 40, olive-oil 10, oregano 1
- Fry the {chicken-breast} in the {olive-oil} for 6–7 minutes a side until cooked through; remove.
- Add the {garlic}, chopped {sun-dried-tomatoes} and {oregano}; stir in the {double-cream} and {parmesan}.
- Wilt in the {spinach}, return the chicken and spoon over the sauce.

# Salmon with lemon-dill butter | French | 4 | 10 | 15 | Easy | 0 | 🍣 🍋 🥦 | 195
Pan-fried salmon with a quick dill butter and green veg.
salmon 480, butter 30, dill 5, lemon 30, broccoli 300, green-beans 200
- Pan-fry the {salmon} for 4 minutes a side.
- Melt the {butter} with the {dill} and {lemon}; spoon over.
- Steam the {broccoli} and {green-beans} and serve alongside.

# Pork & cabbage stir-fry | Chinese | 4 | 10 | 12 | Easy | 1 | 🐖 🥬 🌶️ | 10
A fast, low-carb stir-fry with ginger, chilli and tamari.
pork-mince 500, cabbage 400, spring-onion 30, garlic 9, ginger 10, tamari 30, sesame-oil 15, red-chilli 10, eggs 200
- Brown the {pork-mince} in the {sesame-oil} until cooked through.
- Add the {garlic}, {ginger} and {red-chilli}, then the shredded {cabbage}; stir-fry 5 minutes.
- Season with {tamari}. Fry the {eggs} and serve on top with {spring-onion}.

# Black bean & sweet potato burgers | American | 4 | 20 | 25 | Easy | 0 | 🍔 🫘 🥑 | 25
Smoky plant-based burgers served with a big salad.
black-beans 480, sweet-potato 300, oats 60, cumin 2, paprika 2, onion 55, olive-oil 15, rocket 80, tomato 150, avocado 150
- Microwave and mash the {sweet-potato}; mash in the drained {black-beans}.
- Stir in the {oats}, grated {onion}, {cumin} and {paprika}; shape 8 patties and chill 10 minutes.
- Fry in the {olive-oil} for 4 minutes a side.
- Serve with {rocket}, sliced {tomato} and {avocado}.

# Mushroom stroganoff | French | 4 | 10 | 20 | Easy | 0 | 🍄 🍚 🥛 | 30
Paprika mushrooms in a soured cream sauce over rice.
mushrooms 600, onion 110, garlic 6, paprika 3, sour-cream 150, veg-stock 200, parsley 10, white-rice 300, butter 15
- Cook the {white-rice}.
- Fry the sliced {mushrooms} and {onion} in the {butter} until golden; add the {garlic} and {paprika}.
- Add the {veg-stock}; simmer 5 minutes, then stir in the {sour-cream} off the heat. Top with {parsley}.

# Ratatouille with butter beans | French | 4 | 20 | 40 | Easy | 0 | 🍆 🫑 🫘 | 10
A slow-cooked Provençal vegetable stew made heartier with beans.
aubergine 300, courgette 400, red-pepper 300, onion 110, garlic 9, chopped-tomatoes 400, thyme 1, olive-oil 30, butter-beans 480, basil 10, sourdough 200
- Fry the cubed {aubergine} in half the {olive-oil}; remove.
- Soften the {onion}, {red-pepper} and {courgette} in the rest; add the {garlic} and {thyme}.
- Add the {chopped-tomatoes}, aubergine and drained {butter-beans}; simmer 30 minutes.
- Finish with {basil} and serve with {sourdough}.

# Coq au vin-style chicken | French | 4 | 25 | 75 | Advanced | 0 | 🍗 🍄 🥓 | 350
Chicken braised with bacon, mushrooms and thyme. A splash of vinegar brings the wine-like tang.
chicken-thigh 700, bacon 100, mushrooms 300, onion 110, carrot 200, garlic 9, thyme 1, chicken-stock 500, red-wine-vinegar 20, tomato-puree 20, flour 15, potato 800, parsley 10
- Brown the {chicken-thigh} and chopped {bacon}; remove.
- Fry the {mushrooms}, {onion} and {carrot}; add the {garlic}, {thyme}, {tomato-puree} and {flour}.
- Add the {chicken-stock} and {red-wine-vinegar}, return the chicken and bacon, cover and simmer 50 minutes.
- Boil and mash the {potato}; serve with {parsley}.

# Mackerel with beetroot & potato salad | British | 4 | 15 | 15 | Easy | 0 | 🐟 🥔 🥗 | 330
Crispy-skinned mackerel with warm potatoes, beetroot and dill yogurt.
mackerel 400, potato 600, beetroot 300, greek-yogurt 100, dill 10, lemon 30, rocket 80, olive-oil 10
- Boil the halved {potato} for 15 minutes.
- Fry the {mackerel} skin-side down in the {olive-oil} for 3 minutes, then 1 minute on the other side.
- Mix the {greek-yogurt}, {dill} and {lemon}.
- Toss the potatoes with the {rocket} and wedged {beetroot}; top with the mackerel and dressing.

# Bacon & bean cassoulet | French | 4 | 15 | 40 | Easy | 0 | 🫘 🥓 🍞 | 25
A smoky, hearty bean stew with bacon and a crunchy crumb.
bacon 150, onion 110, carrot 200, celery 80, garlic 9, cannellini 480, chopped-tomatoes 400, chicken-stock 300, thyme 1, paprika 2, sourdough 80, parsley 10, olive-oil 10
- Fry the chopped {bacon} in the {olive-oil}; add the {onion}, {carrot}, {celery} and {garlic}.
- Add the {cannellini}, {chopped-tomatoes}, {chicken-stock}, {thyme} and {paprika}; simmer 25 minutes.
- Blitz the {sourdough} with the {parsley}, scatter over and grill until golden.

# One-pan lemon chicken pasta | Greek | 4 | 10 | 20 | Easy | 0 | 🍗 🍝 🍋 | 60
A one-pan pasta with chicken, lemon, spinach and feta.
chicken-breast 500, pasta 280, chicken-stock 800, lemon 30, lemon-zest 4, garlic 6, spinach 120, feta 80, oregano 1, olive-oil 10
- Brown the diced {chicken-breast} in the {olive-oil} with the {garlic} and {oregano}.
- Add the {pasta} and {chicken-stock}; simmer, stirring, for 12 minutes until the pasta is tender and the chicken cooked through.
- Stir in the {spinach}, {lemon} and {lemon-zest}; top with crumbled {feta}.

# Prawn & pea risotto-style rice | Italian | 4 | 10 | 25 | Easy | 0 | 🦐 🍚 🫛 | 90
A creamy, lemony baked rice with prawns and peas.
white-rice 300, prawns 300, peas 200, onion 110, garlic 6, veg-stock 900, parmesan 40, butter 15, lemon 15, lemon-zest 2
- Soften the {onion} and {garlic} in the {butter}; stir in the {white-rice}.
- Add the hot {veg-stock}, cover and simmer 15 minutes.
- Stir in the {prawns} and {peas}; cook 5 minutes until the prawns are pink.
- Finish with {parmesan}, {lemon} and {lemon-zest}.
`)
