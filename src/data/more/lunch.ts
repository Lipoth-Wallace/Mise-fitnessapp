import { parseRecipes } from '../parse'

export default parseRecipes('lunch', `
# Smoked mackerel, beetroot & potato salad | British | 2 | 10 | 15 | Easy | 0 | 🐟 🥗 🥔 | 330
Warm new potatoes, earthy beetroot and rich mackerel with a dill yogurt dressing.
mackerel 100, beetroot 120, rocket 40, potato 150, greek-yogurt 40, dill 3, lemon 10
- Boil the halved {potato} for 12–15 minutes; drain.
- Mix the {greek-yogurt}, {dill} and {lemon}.
- Toss the potatoes with the {rocket} and wedged {beetroot}; top with flaked {mackerel} and the dressing.

# Chicken Caesar salad | American | 2 | 15 | 15 | Easy | 0 | 🥗 🍗 🧀 | 90
Crisp lettuce, sliced chicken and sourdough croutons in a lighter Caesar dressing.
chicken-breast 250, lettuce 200, parmesan 20, sourdough 50, greek-yogurt 60, mayonnaise 15, lemon 10, anchovies 10, garlic 3, olive-oil 5
- Pan-fry the {chicken-breast} for 6–7 minutes a side until cooked through; slice.
- Cube the {sourdough}, toss with the {olive-oil} and toast in a pan until crisp.
- Mash the {anchovies} and {garlic}; whisk with the {greek-yogurt}, {mayonnaise}, {lemon} and half the {parmesan}.
- Toss the {lettuce} with the dressing, croutons and chicken; finish with the rest of the parmesan.

# Salade niçoise | French | 2 | 15 | 15 | Easy | 0 | 🥗 🐟 🥚 | 140
Tuna, egg, green beans and potatoes with olives and a mustard vinaigrette.
tuna-can 112, eggs 100, green-beans 100, potato 200, tomato 150, olives 30, lettuce 80, olive-oil 15, red-wine-vinegar 10, dijon 5
- Boil the {potato} for 12 minutes, adding the {green-beans} for the last 4. Boil the {eggs} for 8 minutes.
- Whisk the {olive-oil}, {red-wine-vinegar} and {dijon}.
- Arrange the {lettuce}, potatoes, beans, quartered eggs, {tomato}, {olives} and flaked {tuna-can}; drizzle with the dressing.

# Leek & potato soup | British | 4 | 10 | 25 | Easy | 0 | 🥣 🥔 🧅 | 90
Silky, comforting and very cheap to make.
leek 300, potato 400, onion 110, veg-stock 1000, butter 15, milk 150, chives 5
- Soften the sliced {leek} and {onion} in the {butter} for 10 minutes.
- Add the diced {potato} and {veg-stock}; simmer for 15 minutes.
- Blend with the {milk} and top with {chives}.

# Minestrone | Italian | 4 | 15 | 30 | Easy | 0 | 🍲 🫘 🍝 | 15
A hearty Italian vegetable, bean and pasta soup.
olive-oil 10, onion 110, carrot 120, celery 80, garlic 6, passata 400, veg-stock 1000, cannellini 240, pasta 100, kale 80, parmesan 20, basil 5
- Soften the diced {onion}, {carrot} and {celery} in the {olive-oil}; add the {garlic}.
- Add the {passata}, {veg-stock} and drained {cannellini}; simmer for 15 minutes.
- Add the {pasta} and shredded {kale}; cook until the pasta is tender.
- Serve with {parmesan} and {basil}.

# Chicken noodle soup | British | 4 | 10 | 25 | Easy | 0 | 🍜 🍗 🥕 | 50
Clear, restorative chicken broth with noodles and vegetables.
chicken-breast 250, chicken-stock 1200, carrot 120, celery 80, egg-noodles 120, parsley 5, onion 110, thyme 0.5
- Simmer the {chicken-breast} in the {chicken-stock} with the {thyme} for 15 minutes; remove and shred.
- Add the sliced {carrot}, {celery} and {onion}; simmer for 8 minutes.
- Add the {egg-noodles} for 4 minutes, return the chicken and finish with {parsley}.

# Thai-spiced butternut soup | Thai | 4 | 10 | 25 | Easy | 1 | 🎃 🥥 🌶️ | 30
Velvety squash soup with ginger, chilli, coconut and lime.
butternut 600, onion 110, garlic 6, ginger 10, red-chilli 15, coconut-milk 200, veg-stock 700, lime 15, coriander 5, olive-oil 10
- Soften the {onion}, {garlic}, {ginger} and {red-chilli} in the {olive-oil}.
- Add the cubed {butternut} and {veg-stock}; simmer for 20 minutes.
- Blend with the {coconut-milk}; finish with {lime} and {coriander}.

# Hot & sour prawn noodle soup | Thai | 2 | 10 | 12 | Easy | 2 | 🦐 🍜 🍋 | 10
A tom yum-style broth with prawns, mushrooms and rice noodles.
prawns 200, chicken-stock 800, mushrooms 150, tomato 150, lime 30, fish-sauce 15, red-chilli 15, ginger 10, coriander 5, rice-noodles 80
- Simmer the {chicken-stock} with sliced {ginger} and {red-chilli} for 5 minutes.
- Add the sliced {mushrooms} and {tomato}, then the {prawns}; cook 3 minutes until pink.
- Soak the {rice-noodles} in boiling water and divide between bowls.
- Season the broth with {fish-sauce} and {lime}; ladle over and top with {coriander}.

# Chicken pho | Vietnamese | 3 | 15 | 30 | Intermediate | 1 | 🍜 🌿 🍗 | 45
Fragrant spiced broth poured over rice noodles, chicken and herbs.
chicken-breast 250, chicken-stock 1200, rice-noodles 150, ginger 15, onion 110, cinnamon 1, fish-sauce 15, bean-sprouts 100, lime 15, mint 5, coriander 5, red-chilli 10
- Char the halved {onion} and sliced {ginger} in a dry pan.
- Simmer with the {chicken-stock}, {cinnamon} and the {chicken-breast} for 20 minutes; remove and slice the chicken.
- Season the broth with {fish-sauce}. Soak the {rice-noodles}.
- Serve noodles and chicken in bowls, ladle over broth and top with {bean-sprouts}, {mint}, {coriander}, {red-chilli} and {lime}.

# Vietnamese pork noodle salad | Vietnamese | 3 | 15 | 10 | Easy | 1 | 🥗 🍜 🐖 | 100
Bun-style bowls of noodles, crunchy veg and garlicky pork with nuoc cham.
pork-mince 300, rice-noodles 150, lettuce 100, carrot 120, cucumber 150, mint 5, coriander 5, fish-sauce 20, lime 30, sugar 10, garlic 6, red-chilli 10, peanuts 20
- Fry the {pork-mince} with half the {garlic} until browned and cooked through.
- Soak the {rice-noodles}; rinse cold.
- Whisk the {fish-sauce}, {lime}, {sugar}, the rest of the garlic, {red-chilli} and 3 tbsp water.
- Build bowls of {lettuce}, noodles, ribboned {carrot} and {cucumber}, pork, {mint}, {coriander} and {peanuts}; dress.

# Korean beef lettuce cups | Korean | 4 | 10 | 10 | Easy | 1 | 🥬 🥩 🍚 | 0
Sweet-savoury beef spooned into crisp lettuce with rice.
beef-mince 400, soy-sauce 30, honey 15, garlic 9, ginger 10, sesame-oil 10, chilli-powder 2, iceberg 200, spring-onion 30, sesame-seeds 5, white-rice 200
- Cook the {white-rice}.
- Brown the {beef-mince} in the {sesame-oil}; add the {garlic}, {ginger} and {chilli-powder}.
- Stir in the {soy-sauce} and {honey} until sticky.
- Spoon rice and beef into {iceberg} leaves; top with {spring-onion} and {sesame-seeds}.

# Teriyaki chicken rice bowl | Japanese | 2 | 10 | 20 | Easy | 0 | 🍱 🍗 🥦 | 25
Glossy teriyaki chicken thighs over rice with steamed broccoli.
chicken-thigh 300, soy-sauce 30, honey 20, ginger 8, garlic 6, white-rice 150, broccoli 200, sesame-seeds 5, cornflour 5
- Cook the {white-rice}; steam the {broccoli}.
- Fry the sliced {chicken-thigh} until golden and cooked through.
- Mix the {soy-sauce}, {honey}, grated {ginger}, {garlic}, {cornflour} and 3 tbsp water; add to the pan and bubble until glossy.
- Serve over rice with broccoli and {sesame-seeds}.

# Cold soba noodle salad | Japanese | 2 | 10 | 5 | Easy | 0 | 🍜 🫛 🥒 | 130
Buckwheat noodles with edamame, crunchy veg and a sesame-soy dressing.
soba 150, edamame 100, carrot 80, cucumber 100, spring-onion 20, soy-sauce 20, sesame-oil 8, lime 15, sesame-seeds 5
- Cook the {soba} and {edamame} for 4 minutes; rinse under cold water.
- Whisk the {soy-sauce}, {sesame-oil} and {lime}.
- Toss with ribboned {carrot} and {cucumber}, {spring-onion} and {sesame-seeds}.

# Chicken shawarma wraps | Middle Eastern | 2 | 15 | 15 | Easy | 1 | 🌯 🍗 🥒 | 30
Spiced chicken, garlicky yogurt and crunchy salad in warm wraps.
chicken-thigh 300, cumin 2, paprika 2, turmeric 1, garlic 6, lemon 15, olive-oil 10, flour-tortilla 124, greek-yogurt 80, lettuce 60, tomato 100, cucumber 80
- Toss the sliced {chicken-thigh} with the {cumin}, {paprika}, {turmeric}, half the {garlic}, {lemon} and {olive-oil}.
- Fry over a high heat for 10–12 minutes until charred and cooked through.
- Mix the {greek-yogurt} with the rest of the garlic.
- Fill the warm {flour-tortilla}s with {lettuce}, {tomato}, {cucumber}, chicken and garlic yogurt.

# Baked falafel bowl | Middle Eastern | 3 | 20 | 25 | Intermediate | 0 | 🧆 🥗 🍋 | 90
Oven-baked herby falafel with bulgur, salad and tahini.
chickpeas 400, onion 55, garlic 6, cumin 3, coriander 10, parsley 10, gram-flour 30, olive-oil 15, bulgur 100, tomato 150, cucumber 150, tahini 30, lemon 15
- Heat the oven to 200°C. Blitz the drained {chickpeas}, {onion}, {garlic}, {cumin}, {coriander}, {parsley} and {gram-flour} to a coarse paste.
- Shape 12 balls, brush with the {olive-oil} and bake for 25 minutes, turning once.
- Pour boiling water over the {bulgur} to cover; leave 10 minutes.
- Serve with chopped {tomato} and {cucumber}; whisk the {tahini} and {lemon} with water to drizzle.

# Tabbouleh with lemon chicken | Middle Eastern | 3 | 15 | 15 | Easy | 0 | 🥗 🌿 🍗 | 100
A herb-heavy tabbouleh with juicy grilled chicken.
bulgur 120, parsley 40, mint 10, tomato 200, cucumber 150, spring-onion 30, lemon 30, olive-oil 15, chicken-breast 300
- Cover the {bulgur} with boiling water; leave 10 minutes, then drain well.
- Grill the {chicken-breast} with half the {lemon} for 6–7 minutes a side until cooked through.
- Mix the bulgur with lots of chopped {parsley} and {mint}, diced {tomato}, {cucumber} and {spring-onion}.
- Dress with the rest of the lemon and the {olive-oil}; serve with sliced chicken.

# Chicken souvlaki pittas | Greek | 2 | 15 | 12 | Easy | 0 | 🫓 🍗 🍋 | 200
Oregano-lemon chicken in warm pittas with tzatziki and salad.
chicken-breast 300, oregano 2, lemon 15, olive-oil 10, garlic 3, pitta 120, greek-yogurt 80, cucumber 100, tomato 100, onion 30
- Toss the cubed {chicken-breast} with {oregano}, {lemon}, {olive-oil} and half the {garlic}; thread onto skewers.
- Grill for 10–12 minutes, turning, until cooked through.
- Grate half the {cucumber} into the {greek-yogurt} with the rest of the garlic.
- Fill warm {pitta} with chicken, tzatziki, sliced {tomato}, the remaining cucumber and thin {onion}.

# Courgette, feta & mint couscous | Mediterranean | 3 | 10 | 10 | Easy | 0 | 🥒 🧀 🌿 | 80
Charred courgettes tossed with couscous, feta, mint and pine nuts.
couscous 150, courgette 400, feta 100, mint 10, lemon 15, olive-oil 15, pine-nuts 20
- Cover the {couscous} with boiling water; leave 5 minutes and fluff.
- Griddle the sliced {courgette} brushed with the {olive-oil} until charred.
- Toss with the couscous, {lemon}, {mint}, crumbled {feta} and toasted {pine-nuts}.

# Caprese pasta salad | Italian | 3 | 10 | 12 | Easy | 0 | 🍝 🍅 🧀 | 0
Pasta, ripe tomatoes, mozzarella and basil with balsamic.
pasta 200, tomato 300, mozzarella 125, basil 10, olive-oil 15, balsamic 10
- Cook the {pasta}; rinse in cold water.
- Toss with halved {tomato}, torn {mozzarella} and {basil}.
- Dress with the {olive-oil} and {balsamic}.

# Tuna & sweetcorn pasta salad | British | 2 | 10 | 12 | Easy | 0 | 🍝 🐟 🌽 | 55
A lunchbox favourite made lighter with Greek yogurt.
pasta 160, tuna-can 112, sweetcorn 80, red-pepper 75, greek-yogurt 60, mayonnaise 10, spring-onion 15
- Cook the {pasta}, adding the {sweetcorn} for the last 2 minutes; rinse cold.
- Mix the {greek-yogurt} and {mayonnaise}.
- Toss everything with the {tuna-can}, diced {red-pepper} and {spring-onion}.

# Chilli bean jacket potatoes | British | 2 | 5 | 15 | Easy | 1 | 🥔 🫘 🧀 | 15
Fluffy jacket potatoes topped with a quick spiced bean chilli.
potato 600, kidney-beans 240, passata 200, onion 55, cumin 2, chilli-powder 2, cheddar 40, sour-cream 40
- Prick the {potato}es and microwave for 12–15 minutes until soft (or bake for an hour).
- Simmer the chopped {onion}, drained {kidney-beans}, {passata}, {cumin} and {chilli-powder} for 10 minutes.
- Split the potatoes, spoon over the beans and top with {cheddar} and {sour-cream}.

# Loaded sweet potatoes | American | 2 | 5 | 15 | Easy | 0 | 🍠 🫘 🥛 | 25
Jacket sweet potatoes with black beans and cottage cheese.
sweet-potato 600, cottage-cheese 200, spring-onion 15, black-beans 120, chives 2
- Prick and microwave the {sweet-potato}es for 10–12 minutes until tender.
- Warm the {black-beans}.
- Split the potatoes and fill with beans, {cottage-cheese}, {spring-onion} and {chives}.

# Egg & chive sandwiches | British | 2 | 10 | 8 | Easy | 0 | 🥪 🥚 🌿 | 55
Proper egg mayo sandwiches, lightened with a little yogurt.
wholemeal-bread 144, eggs 200, greek-yogurt 40, mayonnaise 15, chives 3, lettuce 30
- Boil the {eggs} for 9 minutes; cool, peel and mash.
- Mix with the {greek-yogurt}, {mayonnaise} and {chives}.
- Fill the {wholemeal-bread} with the egg and {lettuce}.

# Chicken, bacon & avocado club | American | 2 | 10 | 15 | Easy | 0 | 🥪 🥓 🥑 | 35
A triple-decker club with grilled chicken, bacon and avocado.
wholemeal-bread 216, chicken-breast 200, bacon 50, avocado 150, tomato 100, lettuce 40, mayonnaise 15
- Grill the {chicken-breast} for 6–7 minutes a side until cooked through; slice. Grill the {bacon}.
- Toast the {wholemeal-bread} and spread with {mayonnaise}.
- Layer chicken, bacon, sliced {avocado}, {tomato} and {lettuce} between three slices per sandwich.

# Smoked salmon rye open sandwiches | British | 2 | 8 | 0 | Easy | 0 | 🍞 🐟 🥒 | 200
Scandi-style rye with soft cheese, smoked salmon, cucumber and dill.
rye-bread 128, cream-cheese 60, smoked-salmon 100, cucumber 80, dill 3, lemon 10
- Spread the {rye-bread} with the {cream-cheese}.
- Top with ribbons of {cucumber} and the {smoked-salmon}.
- Finish with {dill} and {lemon}.

# Sardines on toast | British | 2 | 5 | 5 | Easy | 0 | 🐟 🍞 🍅 | 5
Sardines in tomato sauce on toast with fresh tomatoes and parsley.
sourdough 100, sardines 120, tomato 100, parsley 3, lemon 5
- Toast the {sourdough}.
- Warm the {sardines} and mash lightly.
- Pile onto the toast with sliced {tomato}, {parsley} and {lemon}.

# Spinach & red lentil dal | Indian | 4 | 10 | 25 | Easy | 1 | 🍛 🥬 🍚 | 45
A creamy, cheap and warming dal with basmati rice.
red-lentils 200, onion 110, garlic 9, ginger 10, turmeric 2, cumin 3, chopped-tomatoes 200, spinach 100, coconut-oil 10, coriander 5, white-rice 200
- Simmer the rinsed {red-lentils} with 700ml water and the {turmeric} for 20 minutes.
- Fry the {onion} in the {coconut-oil}; add the {garlic}, {ginger} and {cumin}, then the {chopped-tomatoes}.
- Stir into the lentils with the {spinach}. Serve with cooked {white-rice} and {coriander}.

# Aloo gobi with naan | Indian | 4 | 10 | 30 | Easy | 2 | 🥔 🥦 🫓 | 40
Spiced potato and cauliflower, dry-cooked until tender.
potato 400, cauliflower 400, onion 110, garlic 6, ginger 10, turmeric 2, cumin 3, chilli-powder 2, chopped-tomatoes 200, olive-oil 15, coriander 5, naan 180
- Fry the {onion} in the {olive-oil}; add the {garlic}, {ginger}, {turmeric}, {cumin} and {chilli-powder}.
- Add the cubed {potato}, {cauliflower} florets and {chopped-tomatoes} with a splash of water.
- Cover and cook for 25 minutes, stirring, until tender. Top with {coriander}; serve with warm {naan}.

# Prawn egg-fried rice | Chinese | 2 | 10 | 10 | Easy | 0 | 🍚 🦐 🥚 | 45
Better than a takeaway, and ready in about 15 minutes.
white-rice 150, eggs 100, prawns 150, peas 80, spring-onion 20, soy-sauce 20, sesame-oil 5, garlic 3
- Cook the {white-rice} and spread out to cool (or use leftover rice).
- Stir-fry the {prawns} and {garlic} in the {sesame-oil} until pink; push aside and scramble the {eggs}.
- Add the rice and {peas}; toss over a high heat. Season with {soy-sauce} and add {spring-onion}.

# Chicken & sweetcorn soup | Chinese | 4 | 10 | 15 | Easy | 0 | 🥣 🌽 🥚 | 55
Silky Chinese-style soup with ribbons of egg.
chicken-breast 300, chicken-stock 1000, sweetcorn 250, eggs 100, cornflour 15, soy-sauce 10, ginger 5, spring-onion 15, egg-noodles 100
- Simmer the {chicken-breast} in the {chicken-stock} with the {ginger} for 12 minutes; shred.
- Add the {sweetcorn} and chicken; thicken with the {cornflour} mixed with water.
- Stir in the beaten {eggs} in a thin stream. Season with {soy-sauce} and add {spring-onion}.
- Cook the {egg-noodles} separately and divide between bowls before ladling over the soup.

# Hoisin chicken wraps | Chinese | 2 | 10 | 12 | Easy | 0 | 🌯 🍗 🥒 | 20
Crispy-duck-style wraps made with chicken, hoisin and cucumber.
chicken-breast 300, hoisin 40, flour-tortilla 124, cucumber 100, spring-onion 30, iceberg 60
- Slice and fry the {chicken-breast} until cooked through; toss in the {hoisin}.
- Fill the warm {flour-tortilla}s with {iceberg}, chicken, {cucumber} matchsticks and {spring-onion}.

# Chicken tortilla soup | Mexican | 4 | 15 | 25 | Easy | 2 | 🥣 🌶️ 🥑 | 20
Smoky tomato soup with chicken, beans and crispy tortilla strips.
chicken-breast 250, chicken-stock 1000, chopped-tomatoes 400, black-beans 240, sweetcorn 100, onion 110, garlic 6, cumin 3, chilli-powder 3, lime 15, corn-tortilla 52, avocado 75, coriander 5
- Soften the {onion} and {garlic}; add the {cumin} and {chilli-powder}.
- Add the {chicken-stock}, {chopped-tomatoes} and {chicken-breast}; simmer for 15 minutes, then shred the chicken.
- Add the {black-beans} and {sweetcorn}; finish with {lime}.
- Bake strips of {corn-tortilla} until crisp; serve on top with {avocado} and {coriander}.

# Black bean & corn salad | Mexican | 3 | 15 | 0 | Easy | 0 | 🫘 🌽 🥑 | 120
A bright, plant-based salad that keeps well for lunches.
black-beans 240, sweetcorn 150, red-pepper 150, tomato 150, onion 55, coriander 10, lime 30, olive-oil 15, cumin 1, avocado 150
- Defrost the {sweetcorn} under hot water.
- Toss with the drained {black-beans}, diced {red-pepper}, {tomato} and {onion}.
- Dress with {lime}, {olive-oil} and {cumin}; fold in {avocado} and {coriander}.

# Chicken fajita rice bowl | Mexican | 2 | 10 | 25 | Easy | 2 | 🌮 🍚 🫑 | 25
Smoky chicken and peppers over brown rice with salsa and soured cream.
chicken-breast 300, red-pepper 150, onion 110, paprika 2, cumin 2, chilli-powder 2, olive-oil 10, brown-rice 120, salsa 80, sour-cream 40, lime 10
- Cook the {brown-rice}.
- Toss the sliced {chicken-breast}, {red-pepper} and {onion} with the {paprika}, {cumin}, {chilli-powder} and {olive-oil}.
- Fry over a high heat for 10 minutes until charred and cooked through.
- Serve over rice with {salsa}, {sour-cream} and {lime}.

# Beetroot, quinoa & goat's cheese salad | French | 2 | 10 | 15 | Easy | 0 | 🥗 🧀 🌰 | 330
Sweet beetroot, creamy goat's cheese and toasted walnuts on peppery leaves.
quinoa 120, beetroot 250, goat-cheese 80, rocket 60, walnuts 30, balsamic 10, olive-oil 10
- Simmer the {quinoa} for 15 minutes; drain and cool.
- Toss with the {rocket}, wedged {beetroot}, {olive-oil} and {balsamic}.
- Top with crumbled {goat-cheese} and toasted {walnuts}.

# Tuscan bean & tuna salad | Italian | 2 | 10 | 0 | Easy | 0 | 🫘 🐟 🍅 | 30
Creamy cannellini beans, tuna and tomatoes with a sharp dressing.
cannellini 240, tuna-can 112, onion 55, tomato 150, rocket 40, parsley 5, olive-oil 15, red-wine-vinegar 10
- Thinly slice the {onion} and soak in the {red-wine-vinegar} for 5 minutes.
- Toss with the drained {cannellini}, chopped {tomato}, {rocket} and {parsley}.
- Top with the {tuna-can} and drizzle with the {olive-oil}.

# Panzanella | Italian | 3 | 15 | 5 | Easy | 0 | 🍅 🍞 🌿 | 10
A Tuscan bread salad soaking up ripe tomato juices.
sourdough 150, tomato 400, cucumber 150, onion 55, basil 10, capers 15, olive-oil 25, red-wine-vinegar 15
- Tear the {sourdough} into chunks and toast in a dry pan.
- Chop the {tomato}; salt lightly and leave 10 minutes to release juice.
- Toss everything with sliced {cucumber} and {onion}, {capers}, {basil}, {olive-oil} and {red-wine-vinegar}; rest 10 minutes.

# Gazpacho | Spanish | 4 | 15 | 0 | Easy | 0 | 🍅 🥒 🫑 | 5
Chilled Andalusian tomato soup for warm days.
tomato 800, cucumber 200, red-pepper 150, garlic 3, olive-oil 30, red-wine-vinegar 20, sourdough 200, salt 2
- Roughly chop the {tomato}, {cucumber}, {red-pepper} and {garlic}.
- Blend with a slice of the {sourdough} (soaked in water), the {olive-oil}, {red-wine-vinegar} and {salt} until smooth.
- Chill for at least an hour; serve with the rest of the bread, toasted.

# Pea & mint soup | British | 4 | 5 | 15 | Easy | 0 | 🥣 🫛 🌿 | 105
Bright green, fresh and ready in 20 minutes from the freezer.
peas 500, onion 110, potato 150, veg-stock 900, mint 10, greek-yogurt 60, olive-oil 10, sourdough 160
- Soften the {onion} in the {olive-oil}; add the diced {potato} and {veg-stock}; simmer 10 minutes.
- Add the {peas} for 3 minutes, then the {mint}.
- Blend until smooth and swirl with {greek-yogurt}. Serve with toasted {sourdough}.

# Roasted tomato & red pepper soup | Mediterranean | 4 | 10 | 35 | Easy | 0 | 🍅 🫑 🥣 | 5
Deeply sweet roasted veg blended into a smoky soup.
tomato 800, red-pepper 300, onion 110, garlic 9, olive-oil 15, veg-stock 600, basil 10, paprika 2, cannellini 240, sourdough 160
- Roast the halved {tomato}, {red-pepper}, {onion} and {garlic} with the {olive-oil} at 200°C for 30 minutes.
- Blend with the hot {veg-stock}, {paprika} and drained {cannellini} until creamy.
- Top with {basil}; serve with toasted {sourdough}.

# Mushroom & barley soup | British | 4 | 10 | 40 | Easy | 0 | 🍄 🥣 🌾 | 30
A thick, earthy soup with chewy pearl barley.
mushrooms 300, pearl-barley 160, onion 110, carrot 120, celery 80, thyme 1, veg-stock 1200, parsley 5, olive-oil 10
- Soften the {onion}, {carrot} and {celery} in the {olive-oil}; add the sliced {mushrooms} and brown.
- Add the rinsed {pearl-barley}, {thyme} and {veg-stock}; simmer 35 minutes until the barley is tender.
- Finish with {parsley}.

# Carrot & coriander soup | British | 4 | 10 | 25 | Easy | 0 | 🥕 🥣 🌿 | 30
A classic, gently spiced with cumin and topped with yogurt.
carrot 600, onion 110, coriander 15, cumin 2, veg-stock 1000, olive-oil 10, greek-yogurt 60, red-lentils 120
- Soften the {onion} in the {olive-oil}; add the {cumin} and chopped {carrot}.
- Add the rinsed {red-lentils} and {veg-stock}; simmer 20 minutes.
- Blend with most of the {coriander}; serve with {greek-yogurt} and the remaining coriander.

# Chicken & avocado quesadillas | Mexican | 4 | 10 | 15 | Easy | 1 | 🫓 🍗 🥑 | 90
Crisp tortillas filled with chicken, avocado and melted cheese.
flour-tortilla 248, chicken-breast 250, avocado 150, cheddar 60, salsa 80, spring-onion 20
- Cook and shred the {chicken-breast}.
- Fill half of each {flour-tortilla} with chicken, sliced {avocado}, {cheddar} and {spring-onion}; fold.
- Dry-fry for 3 minutes a side. Serve with {salsa}.

# Chicken, cranberry & spinach wraps | British | 2 | 10 | 12 | Easy | 0 | 🌯 🍗 🍒 | 350
Festive-feeling wraps with soft cheese and sweet cranberries.
flour-tortilla 124, chicken-breast 200, dried-cranberries 20, cream-cheese 40, spinach 40
- Cook and slice the {chicken-breast}.
- Spread the {flour-tortilla}s with {cream-cheese}; top with {spinach}, chicken and {dried-cranberries}.
- Roll tightly and halve.

# Lemon chicken & spinach pasta | Italian | 3 | 10 | 15 | Easy | 0 | 🍝 🍋 🍗 | 60
Bright, garlicky pasta with chicken, spinach and parmesan.
pasta 200, chicken-breast 300, spinach 100, lemon 30, lemon-zest 3, garlic 6, parmesan 30, olive-oil 15
- Cook the {pasta}.
- Fry the diced {chicken-breast} in the {olive-oil} until cooked through; add the {garlic} and {spinach}.
- Toss with the pasta, a splash of pasta water, the {lemon}, {lemon-zest} and {parmesan}.

# Pea, pesto & ricotta pasta | Italian | 3 | 5 | 12 | Easy | 0 | 🍝 🌿 🫛 | 95
A 15-minute pasta with sweet peas and creamy ricotta.
pasta 200, peas 150, pesto 50, ricotta 100, lemon 15, basil 5
- Cook the {pasta}, adding the {peas} for the last 3 minutes.
- Drain, keeping a splash of water; toss with the {pesto} and {lemon}.
- Top with spoonfuls of {ricotta} and {basil}.

# Spiced aubergine & chickpea couscous | Middle Eastern | 3 | 10 | 25 | Easy | 0 | 🍆 🫘 🌿 | 300
Roasted aubergine and chickpeas over couscous with yogurt and pomegranate.
aubergine 300, chickpeas 240, cumin 2, paprika 2, olive-oil 20, couscous 150, greek-yogurt 100, mint 5, pomegranate 50
- Toss the cubed {aubergine} and drained {chickpeas} with the {cumin}, {paprika} and {olive-oil}; roast at 200°C for 25 minutes.
- Cover the {couscous} with boiling water; leave 5 minutes.
- Serve topped with {greek-yogurt}, {mint} and {pomegranate}.

# Spicy Korean tofu rice bowl | Korean | 3 | 10 | 15 | Easy | 2 | 🍚 🧈 🥒 | 0
Crispy tofu in a sticky chilli glaze with rice and crunchy veg.
tofu 300, soy-sauce 30, honey 15, chilli-powder 2, garlic 6, sesame-oil 10, white-rice 150, cucumber 100, carrot 80, spring-onion 20, sesame-seeds 5
- Cook the {white-rice}.
- Fry the cubed {tofu} in the {sesame-oil} until golden.
- Add the {soy-sauce}, {honey}, {chilli-powder} and {garlic}; toss until sticky.
- Serve over rice with sliced {cucumber}, grated {carrot}, {spring-onion} and {sesame-seeds}.

# Seared salmon poke-style bowl | Japanese | 2 | 15 | 15 | Easy | 0 | 🍣 🥑 🍚 | 15
Seared salmon cubes, rice, edamame and avocado with a soy dressing.
salmon 250, white-rice 150, edamame 100, avocado 100, cucumber 100, soy-sauce 20, sesame-oil 5, sesame-seeds 5, spring-onion 15, lime 10
- Cook the {white-rice}; boil the {edamame} for 4 minutes.
- Cube the {salmon} and sear in a hot pan for 3–4 minutes until cooked through.
- Mix the {soy-sauce}, {sesame-oil} and {lime}.
- Build bowls with rice, salmon, edamame, {avocado} and {cucumber}; dress and top with {sesame-seeds} and {spring-onion}.

# Prawn, mango & avocado salad | Thai | 2 | 15 | 3 | Easy | 1 | 🦐 🥭 🥑 | 40
A zingy salad with chilli-lime dressing.
prawns 200, mango 200, avocado 150, rocket 60, red-chilli 10, lime 30, olive-oil 10, coriander 5
- Cook the {prawns} for 2–3 minutes until pink all the way through; cool.
- Whisk the {lime}, {olive-oil} and chopped {red-chilli}.
- Toss with diced {mango} and {avocado}, the {rocket} and {coriander}.

# Thai beef salad | Thai | 2 | 15 | 8 | Intermediate | 2 | 🥩 🥗 🌶️ | 20
Seared steak, herbs and crunchy veg in a hot-sour-sweet dressing.
flank-steak 300, cucumber 150, tomato 150, onion 55, mint 10, coriander 10, lime 30, fish-sauce 15, sugar 5, red-chilli 10, lettuce 100
- Sear the {flank-steak} for 3–4 minutes a side; rest 5 minutes and slice thinly.
- Whisk the {lime}, {fish-sauce}, {sugar} and chopped {red-chilli}.
- Toss the {lettuce}, {cucumber}, {tomato}, thin {onion}, {mint} and {coriander} with the steak and dressing.

# Chicken satay noodle salad | Thai | 3 | 15 | 15 | Easy | 0 | 🥜 🍜 🍗 | 35
Rice noodles, chicken and crunchy veg in a creamy peanut dressing.
chicken-breast 300, rice-noodles 150, peanut-butter 40, soy-sauce 20, lime 20, honey 10, red-pepper 150, carrot 100, cucumber 100, coriander 5
- Cook the {chicken-breast} until cooked through; slice.
- Soak the {rice-noodles}; rinse cold.
- Whisk the {peanut-butter}, {soy-sauce}, {lime}, {honey} and 3 tbsp warm water.
- Toss with sliced {red-pepper}, {carrot}, {cucumber}, chicken and {coriander}.

# Jerk-spiced chicken with rice & peas | Caribbean | 4 | 15 | 30 | Intermediate | 2 | 🍗 🍚 🫘 | 25
Warm-spiced chicken thighs with coconut rice and kidney beans.
chicken-thigh 400, paprika 3, thyme 1, cinnamon 1, nutmeg 0.5, chilli-powder 3, brown-sugar 5, lime 30, olive-oil 10, white-rice 200, kidney-beans 240, coconut-milk 200, spring-onion 30
- Rub the {chicken-thigh} with the {paprika}, {thyme}, {cinnamon}, {nutmeg}, {chilli-powder}, {brown-sugar}, {lime} and {olive-oil}.
- Roast at 210°C for 25–30 minutes until cooked through.
- Simmer the rinsed {white-rice} with the {coconut-milk}, 200ml water and the drained {kidney-beans} for 15 minutes, covered.
- Serve with sliced {spring-onion}.

# Cauliflower tabbouleh with feta | Mediterranean | 3 | 15 | 0 | Easy | 0 | 🥦 🌿 🧀 | 110
A low-carb tabbouleh using blitzed raw cauliflower.
cauliflower 400, parsley 30, mint 10, tomato 200, cucumber 150, feta 100, lemon 30, olive-oil 20
- Pulse the {cauliflower} into rice-sized pieces.
- Mix with chopped {parsley}, {mint}, {tomato} and {cucumber}.
- Dress with {lemon} and {olive-oil}; top with crumbled {feta}.

# Egg, bacon & avocado salad | American | 2 | 10 | 10 | Easy | 0 | 🥗 🥚 🥓 | 100
A low-carb cobb-style salad with peppery rocket.
eggs 200, avocado 150, rocket 60, bacon 50, olive-oil 10, lemon 10
- Boil the {eggs} for 8 minutes; cool and quarter. Grill and chop the {bacon}.
- Toss the {rocket} with the {olive-oil} and {lemon}.
- Top with eggs, bacon and sliced {avocado}.

# Chicken, broccoli & pesto | Italian | 2 | 5 | 15 | Easy | 0 | 🍗 🥦 🌿 | 100
A simple low-carb pan of chicken and broccoli tossed in pesto.
chicken-breast 300, broccoli 300, pesto 40, parmesan 20, olive-oil 5
- Fry the sliced {chicken-breast} in the {olive-oil} until cooked through.
- Steam the {broccoli} for 4 minutes and add to the pan.
- Toss with the {pesto}; finish with {parmesan}.

# Beef taco lettuce boats | Mexican | 4 | 10 | 12 | Easy | 2 | 🥬 🌮 🥩 | 10
Spiced beef in crisp lettuce cups with all the taco toppings.
beef-mince 400, cumin 3, chilli-powder 3, paprika 2, iceberg 200, cheddar 60, sour-cream 60, tomato 100, avocado 100
- Brown the {beef-mince}; add the {cumin}, {chilli-powder}, {paprika} and a splash of water.
- Spoon into {iceberg} leaves.
- Top with grated {cheddar}, {sour-cream}, diced {tomato} and {avocado}.

# Sweet potato, spinach & coconut soup | Indian | 4 | 10 | 25 | Easy | 1 | 🍠 🥥 🥬 | 30
Lightly curried and silky, with spinach stirred through at the end.
sweet-potato 600, onion 110, ginger 10, coconut-milk 200, veg-stock 800, spinach 100, curry-powder 6, lime 10
- Soften the {onion} and {ginger}; add the {curry-powder}.
- Add the cubed {sweet-potato} and {veg-stock}; simmer 20 minutes.
- Blend with the {coconut-milk}; stir in the {spinach} to wilt and finish with {lime}.

# Roast squash, kale & quinoa salad | American | 3 | 15 | 30 | Easy | 0 | 🎃 🥬 🌻 | 35
Maple-roasted squash with kale, quinoa, seeds and cranberries.
butternut 500, quinoa 150, kale 100, pumpkin-seeds 30, olive-oil 15, maple-syrup 10, dijon 5, lemon 15, dried-cranberries 30
- Roast the cubed {butternut} with half the {olive-oil} at 200°C for 30 minutes.
- Simmer the {quinoa} for 15 minutes.
- Massage the shredded {kale} with the rest of the oil, the {lemon}, {dijon} and {maple-syrup}.
- Toss everything with the {pumpkin-seeds} and {dried-cranberries}.

# Squid & chorizo salad | Spanish | 2 | 10 | 8 | Intermediate | 1 | 🦑 🌶️ 🥗 | 15
Quick-seared squid with crispy chorizo over rocket and tomatoes.
squid 300, chorizo 60, rocket 80, tomato 150, lemon 15, olive-oil 10, parsley 5, paprika 1
- Fry the diced {chorizo} in the {olive-oil} until crisp.
- Add the sliced {squid} and {paprika}; cook for 2 minutes only.
- Toss with the {rocket}, chopped {tomato}, {lemon} and {parsley}.

# Ploughman's lunch | British | 2 | 10 | 0 | Easy | 0 | 🧀 🍎 🍞 | 40
The pub classic: cheddar, ham, apple, celery and crusty bread.
cheddar 80, ham 100, apple 180, sourdough 100, celery 100, tomato 150
- Slice the {cheddar}, {apple}, {celery} and {tomato}.
- Arrange on plates with the {ham} and {sourdough}.

# Greek salad with chickpeas & quinoa | Greek | 2 | 10 | 15 | Easy | 0 | 🥗 🫒 🧀 | 130
A more filling Greek salad with quinoa and chickpeas.
quinoa 80, chickpeas 240, cucumber 150, tomato 200, feta 60, olives 40, onion 30, oregano 1, olive-oil 15, red-wine-vinegar 10
- Simmer the {quinoa} for 15 minutes; cool.
- Toss with the drained {chickpeas}, chopped {cucumber}, {tomato} and {onion}, and the {olives}.
- Dress with {olive-oil}, {red-wine-vinegar} and {oregano}; top with {feta}.

# Turkey meatball subs | Italian | 3 | 15 | 20 | Easy | 0 | 🥖 🍝 🧀 | 10
Lean turkey meatballs in tomato sauce, stuffed in bread with mozzarella.
turkey-mince 400, oats 30, garlic 6, oregano 1, passata 400, basil 5, mozzarella 125, sourdough 210, olive-oil 10
- Mix the {turkey-mince}, {oats}, half the {garlic} and {oregano}; roll 12 balls.
- Brown in the {olive-oil}, add the {passata} and the rest of the garlic; simmer 12 minutes until cooked through.
- Split the {sourdough}, fill with meatballs, sauce, torn {mozzarella} and {basil}.

# Roast carrot & houmous flatbreads | Middle Eastern | 2 | 10 | 15 | Easy | 0 | 🫓 🧆 🥕 | 45
Charred pittas piled with houmous, roast carrot, rocket and seeds.
pitta 120, hummus 100, carrot 240, cumin 1, honey 5, olive-oil 10, rocket 40, sesame-seeds 5
- Roast the {carrot} batons with the {cumin}, {honey} and {olive-oil} at 200°C for 15 minutes.
- Warm the {pitta} and spread with {hummus}.
- Top with the carrots, {rocket} and {sesame-seeds}.

# Leek & gruyère frittata | French | 4 | 10 | 20 | Easy | 0 | 🍳 🧅 🧀 | 50
Sweet buttery leeks baked in eggs with nutty Gruyère. Good cold for lunchboxes.
eggs 400, leek 300, gruyere 60, butter 10, thyme 0.5, rocket 80
- Soften the sliced {leek} in the {butter} with the {thyme} for 8 minutes.
- Pour over the beaten {eggs}, scatter with grated {gruyere} and cook gently for 5 minutes.
- Finish under a hot grill for 5 minutes until set. Serve with {rocket}.

# Hearty bean & kale soup | Italian | 4 | 10 | 25 | Easy | 0 | 🥣 🫘 🥬 | 100
A ribollita-style soup thickened with bread, beans and greens.
olive-oil 15, onion 110, carrot 120, celery 80, garlic 6, chopped-tomatoes 400, cannellini 480, veg-stock 800, kale 150, sourdough 100, rosemary 0.5
- Soften the {onion}, {carrot} and {celery} in the {olive-oil}; add the {garlic} and {rosemary}.
- Add the {chopped-tomatoes}, drained {cannellini} and {veg-stock}; simmer 15 minutes.
- Stir in the {kale} and torn {sourdough}; cook 5 minutes until thick.
`)
