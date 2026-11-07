import { parseRecipes } from '../parse'

export default parseRecipes('snack', `
# Guacamole & veg sticks | Mexican | 4 | 10 | 0 | Easy | 1 | 🥑 🥕 🥒 | 110
Chunky homemade guacamole with crunchy veg for dipping.
avocado 300, lime 30, onion 30, tomato 80, coriander 5, red-chilli 5, carrot 180, cucumber 150
- Mash the {avocado} with the {lime}.
- Stir in finely chopped {onion}, {tomato}, {red-chilli} and {coriander}.
- Serve with {carrot} and {cucumber} sticks.

# Tzatziki & warm pitta | Greek | 6 | 10 | 3 | Easy | 0 | 🥒 🫓 🌿 | 150
Cool garlicky cucumber yogurt with toasted pitta strips.
greek-yogurt 300, cucumber 200, garlic 3, mint 5, dill 3, lemon 10, olive-oil 10, pitta 240
- Grate the {cucumber} and squeeze out the water.
- Mix with the {greek-yogurt}, grated {garlic}, {mint}, {dill}, {lemon} and {olive-oil}.
- Serve with warm {pitta} cut into strips.

# Baba ganoush & veg | Middle Eastern | 6 | 10 | 40 | Easy | 0 | 🍆 🥕 🫑 | 280
Smoky roasted aubergine dip with tahini and lemon. Plant-based.
aubergine 600, tahini 40, garlic 3, lemon 30, olive-oil 15, cumin 1, parsley 5, carrot 180, red-pepper 150
- Roast the whole {aubergine}s at 220°C for 40 minutes until collapsed; scoop out the flesh.
- Mash with the {tahini}, {garlic}, {lemon}, {cumin} and half the {olive-oil}.
- Drizzle with the rest of the oil and {parsley}; serve with {carrot} and {red-pepper} strips.

# Beetroot houmous | Middle Eastern | 6 | 10 | 0 | Easy | 0 | 🧆 🟣 🍋 | 320
A vivid pink houmous with earthy beetroot. Plant-based.
chickpeas 240, beetroot 150, tahini 30, lemon 30, garlic 3, olive-oil 15, cumin 1
- Blend the drained {chickpeas}, {beetroot}, {tahini}, {lemon}, {garlic} and {cumin}.
- Loosen with water and finish with the {olive-oil}.

# Maple-spiced nuts | American | 8 | 5 | 12 | Easy | 0 | 🌰 🍁 ✨ | 30
Roasted almonds and cashews with paprika, cumin and a little maple.
almonds 100, cashews 100, olive-oil 5, paprika 2, cumin 1, maple-syrup 15, salt 1
- Toss the {almonds} and {cashews} with the {olive-oil}, {paprika}, {cumin}, {maple-syrup} and {salt}.
- Roast at 180°C for 10–12 minutes, stirring once. Cool to crisp up.

# Crispy kale crisps | British | 3 | 5 | 15 | Easy | 0 | 🥬 ✨ 🧂 | 110
Light, crunchy baked kale with smoked paprika.
kale 200, olive-oil 15, salt 1, paprika 1
- Tear the {kale} from its stalks; massage with the {olive-oil}, {salt} and {paprika}.
- Spread on trays and bake at 150°C for 12–15 minutes until crisp.

# Smoky savoury popcorn | American | 3 | 2 | 5 | Easy | 0 | 🍿 🌶️ ✨ | 20
Whole-grain popcorn with smoked paprika and salt.
popcorn 60, olive-oil 10, paprika 2, salt 1
- Pop the {popcorn} in a lidded pan with half the {olive-oil}.
- Toss with the rest of the oil, the {paprika} and {salt}.

# Cheddar & apple rice cakes | British | 1 | 3 | 0 | Easy | 0 | 🍘 🧀 🍏 | 90
Crunchy, sweet and salty in under five minutes.
rice-cakes 27, cheddar 20, apple 90
- Top the {rice-cakes} with thin slices of {cheddar} and {apple}.

# Smoked salmon cucumber bites | British | 3 | 10 | 0 | Easy | 0 | 🥒 🐟 🌿 | 180
Low-carb canapés of cucumber, soft cheese and salmon.
cucumber 300, cream-cheese 60, smoked-salmon 60, dill 2, lemon 5
- Slice the {cucumber} into thick rounds.
- Top with {cream-cheese}, folds of {smoked-salmon}, {dill} and a squeeze of {lemon}.

# Devilled eggs | American | 6 | 15 | 10 | Easy | 0 | 🥚 🌶️ 🌿 | 55
Creamy, tangy egg halves. Two halves per serving.
eggs 300, mayonnaise 30, greek-yogurt 30, dijon 5, paprika 1, chives 3
- Boil the {eggs} for 10 minutes; cool, peel and halve.
- Mash the yolks with the {mayonnaise}, {greek-yogurt} and {dijon}; pipe back in.
- Dust with {paprika} and {chives}.

# Ham & cheese roll-ups | British | 2 | 5 | 0 | Easy | 0 | 🍖 🧀 🥒 | 40
A no-cook, low-carb protein snack.
ham 100, cheddar 60, cucumber 100
- Cut the {cheddar} and {cucumber} into sticks.
- Roll each in a slice of {ham}.

# Prawn cocktail lettuce cups | British | 3 | 10 | 0 | Easy | 0 | 🦐 🥬 🍋 | 0
A retro favourite in crisp lettuce with avocado.
prawns 200, iceberg 150, greek-yogurt 50, ketchup 15, lemon 10, paprika 0.5, avocado 75
- Use cooked {prawns}.
- Mix the {greek-yogurt}, {ketchup} and {lemon}; fold in the prawns.
- Spoon into {iceberg} cups with diced {avocado}; dust with {paprika}.

# Apricot coconut energy balls | British | 8 | 15 | 0 | Easy | 0 | 🟠 🥥 🌰 | 30
No-bake bites of apricot, oats, coconut and almond butter. Two per serving.
dried-apricots 150, oats 80, coconut 40, almond-butter 40, chia 10
- Blitz the {dried-apricots}, {oats}, half the {coconut}, the {almond-butter} and {chia} until sticky.
- Roll into 16 balls and coat in the rest of the coconut. Chill.

# Peanut butter protein bars | American | 10 | 15 | 0 | Easy | 0 | 🍫 🥜 🌾 | 30
No-bake oat bars with whey and a chocolate drizzle.
oats 200, whey 60, peanut-butter 120, honey 80, milk 60, dark-chocolate 40
- Warm the {peanut-butter} and {honey}; stir in the {oats}, {whey} and enough {milk} to bind.
- Press into a lined tin; drizzle with melted {dark-chocolate}.
- Chill for 2 hours and cut into 10 bars.

# Banana oat cookies | British | 6 | 5 | 15 | Easy | 0 | 🍪 🍌 🌾 | 40
Soft two-ingredient cookies with raisins and cinnamon. Plant-based.
banana 236, oats 120, raisins 40, cinnamon 1
- Heat the oven to 180°C.
- Mash the {banana}; stir in the {oats}, {raisins} and {cinnamon}.
- Scoop 12 mounds onto a lined tray; bake 15 minutes.

# Roasted spiced pumpkin seeds | British | 6 | 2 | 10 | Easy | 0 | 🎃 ✨ 🌶️ | 35
Crunchy seeds with paprika. A handful is a serving.
pumpkin-seeds 150, olive-oil 5, paprika 1, salt 1
- Toss the {pumpkin-seeds} with the {olive-oil}, {paprika} and {salt}.
- Toast at 180°C for 8–10 minutes.

# Salt & vinegar chickpeas | British | 4 | 5 | 30 | Easy | 0 | 🫘 ✨ 🧂 | 45
Crunchy roast chickpeas with a sharp vinegar tang. Plant-based.
chickpeas 480, red-wine-vinegar 30, olive-oil 10, salt 2
- Simmer the drained {chickpeas} in water with the {red-wine-vinegar} for 5 minutes; drain and dry well.
- Toss with the {olive-oil} and {salt}; roast at 200°C for 25–30 minutes until crunchy.

# Houmous & cucumber rice cakes | Middle Eastern | 1 | 3 | 0 | Easy | 0 | 🍘 🧆 🥒 | 130
Rice cakes topped with houmous and cool cucumber.
rice-cakes 27, hummus 40, cucumber 50, paprika 0.3
- Spread the {rice-cakes} with {hummus}.
- Top with sliced {cucumber} and a pinch of {paprika}.

# Peanut butter yogurt dip & apple | American | 3 | 5 | 0 | Easy | 0 | 🍎 🥜 🥛 | 30
A protein-rich sweet dip for apple slices.
greek-yogurt 150, peanut-butter 30, honey 10, cinnamon 0.5, apple 360
- Whisk the {greek-yogurt}, {peanut-butter}, {honey} and {cinnamon}.
- Serve with sliced {apple}.

# Avocado & tomato rye bites | British | 2 | 5 | 2 | Easy | 0 | 🥑 🍅 🍞 | 100
Crushed avocado and tomato on toasted rye.
rye-bread 64, avocado 75, tomato 60, lime 5, chilli-powder 0.3
- Toast the {rye-bread} and cut into fingers.
- Top with {avocado} mashed with the {lime}, diced {tomato} and {chilli-powder}.

# Caprese skewers | Italian | 4 | 10 | 0 | Easy | 0 | 🍅 🧀 🌿 | 0
Cherry tomatoes, mozzarella and basil with a balsamic drizzle.
tomato 200, mozzarella 125, basil 5, balsamic 10, olive-oil 5
- Thread the {tomato}es, torn {mozzarella} and {basil} onto cocktail sticks.
- Drizzle with the {balsamic} and {olive-oil}.

# Tomato bruschetta | Italian | 4 | 10 | 3 | Easy | 0 | 🍞 🍅 🌿 | 5
Garlic-rubbed toast topped with fresh tomatoes and basil. Plant-based.
sourdough 150, tomato 300, garlic 3, basil 10, olive-oil 15, balsamic 5
- Toast the {sourdough} and rub with the cut {garlic}.
- Toss the diced {tomato} with the {basil}, {olive-oil} and {balsamic}; spoon on top.

# Olive & feta mezze | Greek | 4 | 5 | 0 | Easy | 0 | 🫒 🧀 🥒 | 100
Marinated olives and feta with cucumber.
olives 120, feta 100, oregano 1, lemon-zest 2, olive-oil 10, cucumber 150
- Cube the {feta}; toss with the {olives}, {oregano}, {lemon-zest} and {olive-oil}.
- Serve with {cucumber} batons.

# Japanese cucumber sesame salad | Japanese | 3 | 10 | 0 | Easy | 0 | 🥒 🥢 ✨ | 120
A light sunomono-style salad with a sweet-sour dressing. Plant-based.
cucumber 300, red-wine-vinegar 20, sugar 5, soy-sauce 10, sesame-seeds 5, sesame-oil 3
- Thinly slice the {cucumber}.
- Whisk the {red-wine-vinegar}, {sugar}, {soy-sauce} and {sesame-oil}; toss and top with {sesame-seeds}.

# Tuna mayo onigiri | Japanese | 3 | 15 | 15 | Intermediate | 0 | 🍙 🐟 🍚 | 200
Rice balls filled with tuna mayo. Two per serving.
white-rice 150, tuna-can 112, mayonnaise 20, soy-sauce 5, sesame-seeds 3
- Cook the {white-rice}; cool until just warm.
- Mix the {tuna-can}, {mayonnaise} and {soy-sauce}.
- With wet hands, shape 6 rice balls around a spoon of filling; sprinkle with {sesame-seeds}.

# Smacked cucumber salad | Chinese | 4 | 10 | 0 | Easy | 1 | 🥒 🧄 🌶️ | 115
Crushed cucumber in a garlicky, tangy chilli dressing. Plant-based.
cucumber 400, garlic 6, soy-sauce 15, red-wine-vinegar 15, sesame-oil 8, chilli-powder 1, sugar 3
- Bash the {cucumber} with a rolling pin and cut into chunks.
- Toss with the grated {garlic}, {soy-sauce}, {red-wine-vinegar}, {sesame-oil}, {chilli-powder} and {sugar}.

# Soy-marinated eggs | Japanese | 6 | 10 | 7 | Intermediate | 0 | 🥚 🍜 🥢 | 35
Jammy ramen-style eggs marinated in soy, honey and ginger.
eggs 300, soy-sauce 60, honey 15, garlic 3, ginger 5
- Boil the {eggs} for 6½ minutes; cool in iced water and peel.
- Mix the {soy-sauce}, {honey}, {garlic}, {ginger} and 60ml water.
- Marinate the eggs in the fridge for at least 6 hours.

# Korean spicy cucumber | Korean | 3 | 10 | 0 | Easy | 2 | 🥒 🌶️ ✨ | 5
Oi muchim: crunchy cucumber in a quick chilli-sesame dressing. Plant-based.
cucumber 400, chilli-powder 3, garlic 3, soy-sauce 10, sesame-oil 5, sugar 3, sesame-seeds 3, spring-onion 15
- Slice the {cucumber} thinly.
- Toss with the {chilli-powder}, {garlic}, {soy-sauce}, {sesame-oil}, {sugar}, {spring-onion} and {sesame-seeds}.

# Thai peanut dip & veg | Thai | 4 | 10 | 0 | Easy | 1 | 🥜 🥕 🫑 | 35
A creamy satay-style dip with crunchy veg.
peanut-butter 80, coconut-milk 60, soy-sauce 15, lime 15, honey 10, chilli-powder 1, carrot 180, cucumber 150, red-pepper 150
- Whisk the {peanut-butter}, {coconut-milk}, {soy-sauce}, {lime}, {honey} and {chilli-powder}.
- Serve with {carrot}, {cucumber} and {red-pepper} sticks.

# Baked Thai fishcakes | Thai | 4 | 20 | 15 | Intermediate | 2 | 🐟 🌶️ 🌿 | 175
Bouncy fishcakes with chilli, lime and green beans. Three per serving.
cod 400, red-chilli 10, garlic 3, coriander 10, lime 15, fish-sauce 10, eggs 50, green-beans 80, cornflour 15, olive-oil 10
- Blitz the {cod}, {red-chilli}, {garlic}, {coriander}, {lime}, {fish-sauce}, {eggs} and {cornflour} to a paste.
- Stir in finely sliced {green-beans}; shape 12 cakes.
- Brush with the {olive-oil} and bake at 200°C for 15 minutes until cooked through.

# Masala popcorn | Indian | 3 | 2 | 5 | Easy | 1 | 🍿 🌶️ ✨ | 40
Popcorn tossed with turmeric, cumin and chilli.
popcorn 60, coconut-oil 10, turmeric 1, cumin 1, chilli-powder 1, salt 1
- Pop the {popcorn} in a lidded pan with half the {coconut-oil}.
- Warm the rest of the oil with the {turmeric}, {cumin}, {chilli-powder} and {salt}; toss through.

# Baked onion bhajis | Indian | 4 | 15 | 20 | Intermediate | 1 | 🧅 🌶️ 🥛 | 35
Crisp onion fritters baked, not fried, with minty yogurt.
onion 330, gram-flour 100, cumin 2, turmeric 1, chilli-powder 1, coriander 10, olive-oil 15, greek-yogurt 100, mint 5
- Thinly slice the {onion}; mix with the {gram-flour}, {cumin}, {turmeric}, {chilli-powder}, {coriander} and a little water.
- Shape 12 mounds on a tray, drizzle with the {olive-oil} and bake at 210°C for 20 minutes, turning once.
- Serve with the {greek-yogurt} mixed with {mint}.

# Masala peanuts | Indian | 8 | 5 | 15 | Easy | 2 | 🥜 🌶️ ✨ | 30
Crunchy spiced peanuts in a crisp gram-flour coating.
peanuts 200, gram-flour 30, chilli-powder 2, turmeric 1, olive-oil 10, salt 1
- Toss the {peanuts} with the {gram-flour}, {chilli-powder}, {turmeric}, {salt}, the {olive-oil} and a splash of water.
- Roast at 180°C for 12–15 minutes, stirring once.

# Mexican street corn cups | Mexican | 4 | 5 | 8 | Easy | 1 | 🌽 🧀 🍋 | 50
Charred sweetcorn with tangy yogurt, feta, lime and chilli.
sweetcorn 400, greek-yogurt 60, feta 50, lime 15, chilli-powder 1, coriander 5
- Char the {sweetcorn} in a hot dry pan for 6–8 minutes.
- Stir in the {greek-yogurt} and {lime}.
- Top with crumbled {feta}, {chilli-powder} and {coriander}.

# Loaded bean nachos | Mexican | 4 | 10 | 12 | Easy | 1 | 🌮 🧀 🥑 | 30
Baked tortilla chips with beans, cheese and all the toppings.
corn-tortilla 208, olive-oil 10, black-beans 240, cheddar 80, salsa 150, avocado 100, sour-cream 60
- Cut the {corn-tortilla}s into wedges, brush with the {olive-oil} and bake at 200°C for 8 minutes.
- Top with the {black-beans} and {cheddar}; bake 4 minutes more.
- Finish with {salsa}, diced {avocado} and {sour-cream}.

# Spiced black bean dip | Mexican | 6 | 10 | 0 | Easy | 1 | 🫘 🥕 🫑 | 20
A smooth, smoky bean dip with veg sticks. Plant-based.
black-beans 400, lime 20, garlic 3, cumin 2, chilli-powder 1, olive-oil 10, coriander 5, red-pepper 150, carrot 120
- Blend the drained {black-beans}, {lime}, {garlic}, {cumin}, {chilli-powder} and {olive-oil}.
- Top with {coriander}; serve with {red-pepper} and {carrot} sticks.

# Smoked mackerel pâté on rye | British | 4 | 10 | 0 | Easy | 0 | 🐟 🍞 🍋 | 200
A punchy, omega-3-rich spread for rye toast.
mackerel 200, cream-cheese 100, lemon 15, dill 3, black-pepper 0.5, rye-bread 128
- Flake the {mackerel}, removing any bones.
- Mash with the {cream-cheese}, {lemon}, {dill} and {black-pepper}.
- Serve on toasted {rye-bread}.

# Cottage cheese & chive dip | British | 3 | 10 | 0 | Easy | 0 | 🥛 🥕 🌿 | 90
A high-protein dip with crunchy crudités.
cottage-cheese 250, chives 5, black-pepper 0.3, carrot 120, celery 100, cucumber 150
- Stir the {chives} and {black-pepper} into the {cottage-cheese}.
- Serve with {carrot}, {celery} and {cucumber} sticks.

# Almond butter stuffed dates | Middle Eastern | 4 | 10 | 0 | Easy | 0 | 🟤 🌰 🍫 | 25
Sweet dates filled with almond butter and dipped in chocolate.
dates 192, almond-butter 40, dark-chocolate 20, salt 0.3
- Slit and stone the {dates}; fill each with {almond-butter}.
- Drizzle with melted {dark-chocolate} and a pinch of {salt}; chill to set.

# Frozen yogurt blueberries | British | 4 | 10 | 0 | Easy | 0 | 🫐 🥛 🧊 | 240
Bite-size frozen blueberry and yogurt clusters.
blueberries 200, greek-yogurt 150, honey 15
- Stir the {blueberries} into the {greek-yogurt} sweetened with the {honey}.
- Spoon small clusters onto a lined tray and freeze for 2 hours.

# Baked cinnamon apple crisps | British | 3 | 10 | 120 | Easy | 0 | 🍎 ✨ 🌰 | 25
Thin apple slices dried in a low oven until crisp. Plant-based.
apple 540, cinnamon 2
- Slice the {apple}s very thinly; lay on lined trays and dust with {cinnamon}.
- Bake at 110°C for 2 hours, turning halfway, then cool to crisp.

# Pear, walnut & blue cheese | French | 2 | 5 | 0 | Easy | 0 | 🍐 🧀 🌰 | 60
A classic flavour trio with a drizzle of honey.
pear 178, blue-cheese 30, walnuts 15, honey 5
- Slice the {pear}.
- Serve with crumbled {blue-cheese}, {walnuts} and a drizzle of {honey}.

# Ricotta, pear & honey crostini | Italian | 4 | 10 | 3 | Easy | 0 | 🍞 🧀 🍐 | 40
Toasted sourdough with creamy ricotta, pear and walnuts.
sourdough 100, ricotta 120, honey 15, walnuts 20, pear 89
- Toast the {sourdough} and cut into small pieces.
- Spread with {ricotta}; top with thin {pear} slices, chopped {walnuts} and {honey}.

# Grapes, cheddar & almonds | British | 3 | 3 | 0 | Easy | 0 | 🍇 🧀 🌰 | 290
A simple snack plate with something sweet, salty and crunchy.
grapes 200, cheddar 60, almonds 30
- Arrange the {grapes}, cubed {cheddar} and {almonds} on a plate.

# Chocolate protein balls | British | 8 | 15 | 0 | Easy | 0 | 🍫 🥜 ⚡ | 25
No-bake chocolate oat balls with whey. Two per serving.
oats 100, whey 50, cocoa 15, peanut-butter 80, honey 60, milk 30
- Mix the {oats}, {whey} and {cocoa}.
- Stir in the {peanut-butter}, {honey} and enough {milk} to bind.
- Roll into 16 balls and chill.

# Chicken satay skewers | Thai | 6 | 20 | 12 | Intermediate | 0 | 🍢 🥜 🍗 | 35
Grilled curried chicken skewers with a peanut sauce.
chicken-breast 400, peanut-butter 50, soy-sauce 20, lime 15, honey 10, curry-powder 3, coconut-milk 60
- Toss the sliced {chicken-breast} with the {curry-powder} and half the {soy-sauce}; thread onto skewers.
- Grill for 10–12 minutes, turning, until cooked through.
- Whisk the {peanut-butter}, {coconut-milk}, {lime}, {honey} and the rest of the soy for dipping.

# Mini chicken & herb meatballs | Mediterranean | 6 | 15 | 15 | Easy | 0 | 🍗 🌿 🥛 | 100
Lemony chicken meatballs with a yogurt dip.
chicken-mince 400, parsley 10, garlic 3, lemon-zest 2, oats 30, eggs 50, olive-oil 10, greek-yogurt 100
- Mix the {chicken-mince}, {parsley}, {garlic}, {lemon-zest}, {oats} and {eggs}; roll 24 balls.
- Brush with the {olive-oil} and bake at 200°C for 15 minutes until cooked through.
- Serve with the {greek-yogurt} for dipping.

# Muhammara with pitta | Middle Eastern | 6 | 15 | 25 | Easy | 1 | 🫑 🌰 🫓 | 10
A rich roasted pepper and walnut dip.
red-pepper 450, walnuts 80, sourdough 40, garlic 3, cumin 1, lemon 15, olive-oil 20, chilli-powder 1, pitta 240
- Roast the {red-pepper}s at 220°C for 25 minutes; peel.
- Blend with the toasted {walnuts}, {sourdough}, {garlic}, {cumin}, {lemon}, {chilli-powder} and {olive-oil}.
- Serve with warm {pitta}.

# Fruit kebabs with yogurt dip | British | 4 | 15 | 0 | Easy | 0 | 🍓 🍍 🥝 | 340
Rainbow fruit skewers with honeyed yogurt.
strawberries 200, pineapple 200, grapes 150, kiwi 138, greek-yogurt 150, honey 10
- Thread the {strawberries}, {pineapple}, {grapes} and {kiwi} onto skewers.
- Serve with the {greek-yogurt} mixed with {honey}.

# Chia jam rice cakes | American | 3 | 10 | 5 | Easy | 0 | 🍘 🍇 🌰 | 340
Quick raspberry chia jam on rice cakes with almond butter.
raspberries 200, chia 20, maple-syrup 15, rice-cakes 54, almond-butter 30
- Warm and mash the {raspberries} with the {maple-syrup}; stir in the {chia} and leave 10 minutes.
- Spread the {rice-cakes} with {almond-butter} and top with the jam.

# Ham, pea & cheddar frittata fingers | British | 6 | 10 | 20 | Easy | 0 | 🍳 🍖 🫛 | 85
Lunchbox-friendly frittata cut into fingers.
eggs 300, ham 100, peas 100, cheddar 50, spring-onion 20, olive-oil 5
- Heat the oven to 190°C and oil a small tin with the {olive-oil}.
- Beat the {eggs}; stir in chopped {ham}, {peas}, {spring-onion} and grated {cheddar}.
- Bake 18–20 minutes; cool and cut into 12 fingers.

# Spinach & feta muffins | Greek | 12 | 15 | 25 | Easy | 0 | 🧁 🥬 🧀 | 100
Savoury muffins with spinach, feta and sun-dried tomatoes.
flour 200, baking-powder 10, eggs 100, milk 150, olive-oil 60, spinach 100, feta 100, sun-dried-tomatoes 40
- Heat the oven to 200°C and line a 12-hole tin.
- Whisk the {eggs}, {milk} and {olive-oil}; stir into the {flour} and {baking-powder}.
- Fold in chopped {spinach}, {feta} and {sun-dried-tomatoes}; bake 20–25 minutes.

# Sweet potato wedges & chive dip | American | 4 | 10 | 30 | Easy | 0 | 🍠 🥛 🌿 | 25
Smoky wedges with a cool yogurt and chive dip.
sweet-potato 600, olive-oil 15, paprika 2, greek-yogurt 150, chives 5
- Cut the {sweet-potato} into wedges; toss with the {olive-oil} and {paprika}.
- Roast at 220°C for 30 minutes.
- Serve with the {greek-yogurt} mixed with {chives}.

# Crispy courgette fries | Italian | 4 | 15 | 20 | Easy | 0 | 🥒 🧀 🥛 | 90
Parmesan-crumbed courgette sticks with a yogurt dip.
courgette 400, flour 30, eggs 50, parmesan 30, sourdough 40, paprika 1, greek-yogurt 100
- Blitz the {sourdough} with the {parmesan} and {paprika}.
- Cut the {courgette} into fries; dust in {flour}, dip in beaten {eggs} and coat in the crumbs.
- Bake at 220°C for 20 minutes. Serve with {greek-yogurt}.

# Peach & cottage cheese bowl | American | 1 | 3 | 0 | Easy | 0 | 🍑 🥛 🎃 | 30
A sweet, high-protein snack bowl.
cottage-cheese 150, peach 150, cinnamon 0.3, pumpkin-seeds 10
- Spoon the {cottage-cheese} into a bowl.
- Top with sliced {peach}, {pumpkin-seeds} and a pinch of {cinnamon}.

# Iced protein coffee | American | 1 | 3 | 0 | Easy | 0 | ☕ 🧊 🥛 | 30
Cold coffee shaken with milk and whey.
coffee 3, milk 300, whey 25, maple-syrup 5
- Dissolve the {coffee} in 2 tbsp hot water.
- Shake with the cold {milk}, {whey} and {maple-syrup}; pour over ice.

# Chocolate banana milk | British | 1 | 3 | 0 | Easy | 0 | 🥛 🍫 🍌 | 25
A recovery shake after training, sweetened with banana.
milk 400, cocoa 10, banana 118, honey 10
- Blend the {milk}, {cocoa}, {banana} and {honey} until smooth.

# Radishes with butter & rye | French | 2 | 5 | 0 | Easy | 0 | 🌱 🧈 🍞 | 350
The French way: crisp radishes, good butter and a pinch of salt.
radish 150, butter 15, salt 1, rye-bread 64
- Halve the {radish}es.
- Serve with the {butter}, {salt} and {rye-bread}.

# Watermelon & feta cubes | Greek | 4 | 10 | 0 | Easy | 0 | 🍉 🧀 🌿 | 355
Sweet watermelon and salty feta with mint and lime.
watermelon 400, feta 80, mint 5, lime 10
- Cube the {watermelon} and {feta}.
- Toss with torn {mint} and a squeeze of {lime}.

# Seeded crackers | British | 10 | 10 | 50 | Easy | 0 | 🌻 🍘 ✨ | 40
Crunchy flax and seed crackers. Gluten-free and plant-based.
flaxseed 60, sunflower-seeds 60, pumpkin-seeds 60, sesame-seeds 40, chia 40, salt 2
- Mix the {flaxseed}, {sunflower-seeds}, {pumpkin-seeds}, {sesame-seeds}, {chia} and {salt} with 200ml water; leave 15 minutes.
- Spread thinly on a lined tray and bake at 160°C for 30 minutes.
- Cut into pieces, flip and bake 20 minutes more until crisp.

# Parmesan crisps | Italian | 4 | 5 | 6 | Easy | 0 | 🧀 ✨ 🌿 | 45
Lacy, crunchy cheese crisps with rosemary. Low-carb.
parmesan 100, black-pepper 0.5, rosemary 0.5
- Heat the oven to 200°C.
- Make 12 small piles of grated {parmesan} on a lined tray; sprinkle with {black-pepper} and {rosemary}.
- Bake 5–6 minutes until golden; cool to crisp.

# Bacon-wrapped asparagus | British | 4 | 10 | 15 | Easy | 0 | 🌿 🥓 ✨ | 100
Crisp bacon around tender asparagus spears. Low-carb.
asparagus 250, bacon 100, olive-oil 3, black-pepper 0.3
- Wrap the {asparagus} spears in strips of {bacon}.
- Brush with the {olive-oil}, season with {black-pepper} and roast at 200°C for 12–15 minutes.

# Edamame & pea smash on rice cakes | Japanese | 2 | 10 | 4 | Easy | 0 | 🫛 🍘 🍋 | 110
A protein-packed green spread with lemon and sesame.
edamame 120, peas 80, lemon 10, sesame-oil 3, rice-cakes 36, sesame-seeds 3
- Boil the {edamame} and {peas} for 4 minutes; drain.
- Crush with the {lemon} and {sesame-oil}.
- Spread on the {rice-cakes} and sprinkle with {sesame-seeds}.

# Tuna & sweetcorn stuffed peppers | British | 2 | 10 | 0 | Easy | 0 | 🫑 🐟 🌽 | 20
Crunchy mini pepper boats filled with creamy tuna.
red-pepper 300, tuna-can 112, sweetcorn 60, greek-yogurt 40, spring-onion 10
- Halve and deseed the {red-pepper}s.
- Mix the {tuna-can}, defrosted {sweetcorn}, {greek-yogurt} and {spring-onion}; spoon in.

# Kefir & oat smoothie | British | 1 | 3 | 0 | Easy | 0 | 🥤 🍓 🌾 | 340
A tangy probiotic smoothie with strawberries and oats.
kefir 200, strawberries 100, oats 20, honey 5
- Blend the {kefir}, {strawberries}, {oats} and {honey} until smooth.
`)
