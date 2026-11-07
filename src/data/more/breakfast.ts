import { parseRecipes } from '../parse'

export default parseRecipes('breakfast', `
# Smoked salmon & chive scrambled eggs | British | 1 | 5 | 5 | Easy | 0 | 🍳 🐟 🌿 | 15
Silky scrambled eggs folded with smoked salmon, on toasted rye.
eggs 150, smoked-salmon 50, chives 3, rye-bread 64, butter 5, black-pepper 0.5
- Toast the {rye-bread}.
- Melt the {butter} over a low heat, add the beaten {eggs} and stir slowly until just set.
- Fold in the torn {smoked-salmon} and snipped {chives}, season with {black-pepper} and pile onto the toast.

# Full English traybake | British | 2 | 10 | 25 | Easy | 0 | 🍳 🥓 🍄 | 25
Everything on one tray, with quick homemade beans instead of a tin.
eggs 200, bacon 100, mushrooms 200, tomato 240, cannellini 240, passata 150, paprika 1, sourdough 100, olive-oil 10
- Heat the oven to 200°C. Toss the {mushrooms} and halved {tomato} in the {olive-oil} on a tray with the {bacon}; roast for 12 minutes.
- Meanwhile simmer the drained {cannellini} with the {passata} and {paprika} for 10 minutes.
- Make two gaps on the tray, crack in the {eggs} and bake for 6–8 minutes until the whites set.
- Serve with the beans and toasted {sourdough}.

# Huevos rancheros | Mexican | 1 | 5 | 10 | Easy | 1 | 🍳 🌮 🥑 | 20
Fried eggs on warm corn tortillas with beans, salsa and avocado.
corn-tortilla 52, eggs 100, black-beans 80, salsa 60, avocado 50, coriander 3, olive-oil 5
- Warm the {black-beans} with half the {salsa}.
- Fry the {eggs} in the {olive-oil}; warm the {corn-tortilla}s in a dry pan.
- Top the tortillas with beans, eggs, the rest of the salsa, sliced {avocado} and {coriander}.

# Masala omelette | Indian | 1 | 5 | 5 | Easy | 2 | 🍳 🌶️ 🍅 | 40
A spiced Indian-style omelette with tomato, onion and fresh chilli.
eggs 150, onion 30, tomato 50, red-chilli 5, coriander 3, turmeric 0.5, olive-oil 5, wholemeal-bread 36
- Finely chop the {onion}, {tomato}, {red-chilli} and {coriander}.
- Beat the {eggs} with the {turmeric} and the chopped veg.
- Cook in the {olive-oil} over a medium heat, folding once set. Serve with toasted {wholemeal-bread}.

# Ginger chicken congee | Chinese | 1 | 5 | 30 | Easy | 0 | 🍚 🥚 🫚 | 45
Gentle, savoury rice porridge with ginger, egg and spring onion.
white-rice 60, chicken-stock 500, ginger 8, eggs 50, spring-onion 15, soy-sauce 5, sesame-oil 3
- Simmer the rinsed {white-rice} in the {chicken-stock} with sliced {ginger} for 25–30 minutes, stirring often, until thick.
- Stir in the beaten {eggs} in a thin stream.
- Finish with {soy-sauce}, {sesame-oil} and sliced {spring-onion}.

# Rolled omelette & rice | Japanese | 1 | 5 | 15 | Intermediate | 0 | 🍳 🍚 🥢 | 50
A lightly sweet rolled omelette with steamed rice. A Japanese breakfast staple.
eggs 150, soy-sauce 5, sugar 3, white-rice 60, spring-onion 10, sesame-oil 3
- Cook the rinsed {white-rice}.
- Beat the {eggs} with the {soy-sauce} and {sugar}.
- Oil a small pan with the {sesame-oil}; pour in a thin layer, roll it up, and repeat with the rest of the egg.
- Slice and serve with the rice and {spring-onion}.

# Turkish eggs | Middle Eastern | 1 | 5 | 8 | Intermediate | 1 | 🍳 🥛 🌶️ | 10
Poached eggs on garlicky yogurt with paprika butter and dill.
greek-yogurt-full 150, garlic 3, eggs 100, butter 10, paprika 1, dill 3, sourdough 50
- Stir the grated {garlic} into the {greek-yogurt-full} and spread on a plate.
- Poach the {eggs} for 3 minutes and set on the yogurt.
- Melt the {butter} with the {paprika} and spoon over. Scatter with {dill}; serve with toasted {sourdough}.

# Apple Bircher muesli | British | 1 | 5 | 0 | Easy | 0 | 🍏 🥣 🌰 | 95
Oats soaked overnight with grated apple, yogurt and hazelnuts.
oats 50, apple 90, milk 100, greek-yogurt 80, honey 8, hazelnuts 10, raisins 15
- Mix the {oats}, {milk}, {greek-yogurt} and {raisins}; chill overnight.
- In the morning, grate in the {apple}.
- Top with chopped {hazelnuts} and {honey}.

# Peanut butter banana toast | American | 1 | 3 | 2 | Easy | 0 | 🍞 🥜 🍌 | 35
Wholemeal toast, peanut butter and banana. Quick and filling.
wholemeal-bread 72, peanut-butter 20, banana 118, cinnamon 0.5, chia 5
- Toast the {wholemeal-bread}.
- Spread with the {peanut-butter} and top with sliced {banana}.
- Sprinkle with {cinnamon} and {chia}.

# Cottage cheese berry bowl | British | 1 | 3 | 0 | Easy | 0 | 🫐 🥛 🌰 | 240
High-protein cottage cheese with blueberries, flaxseed and walnuts.
cottage-cheese 200, blueberries 80, flaxseed 10, honey 8, walnuts 10
- Spoon the {cottage-cheese} into a bowl.
- Top with {blueberries}, {flaxseed} and chopped {walnuts}.
- Drizzle with {honey}.

# Ricotta & peach toast | Italian | 1 | 5 | 2 | Easy | 0 | 🍑 🍞 🍯 | 28
Creamy ricotta and sliced peach on toasted sourdough with honey.
sourdough 50, ricotta 60, peach 150, honey 8, almonds 8
- Toast the {sourdough}.
- Spread with the {ricotta} and top with sliced {peach}.
- Finish with {honey} and chopped {almonds}.

# Chorizo & potato hash | Spanish | 2 | 10 | 25 | Easy | 1 | 🥔 🍳 🌶️ | 15
Crispy potatoes, smoky chorizo and peppers topped with fried eggs.
potato 500, chorizo 80, red-pepper 150, onion 110, eggs 200, olive-oil 10, paprika 2, parsley 5
- Dice the {potato} and par-boil for 6 minutes; drain well.
- Fry in the {olive-oil} with the diced {chorizo}, {onion} and {red-pepper} for 15 minutes until crisp, adding the {paprika} near the end.
- Make wells, crack in the {eggs}, cover and cook until set. Scatter with {parsley}.

# Korean-style egg rice bowl | Korean | 1 | 5 | 10 | Easy | 1 | 🍚 🍳 🥕 | 5
Rice topped with a fried egg, garlicky spinach and carrot.
white-rice 60, eggs 100, spinach 50, carrot 40, sesame-oil 5, soy-sauce 8, chilli-powder 1, sesame-seeds 3
- Cook the {white-rice}.
- Wilt the {spinach} and stir-fry the grated {carrot} briefly in half the {sesame-oil}.
- Fry the {eggs} in the rest of the oil.
- Top the rice with the veg and eggs; season with {soy-sauce}, {chilli-powder} and {sesame-seeds}.

# Gram flour chilla | Indian | 1 | 5 | 8 | Easy | 1 | 🥞 🧅 🌿 | 42
Savoury chickpea-flour pancakes with onion and tomato, served with yogurt.
gram-flour 60, onion 30, tomato 40, coriander 3, cumin 1, turmeric 0.5, red-chilli 5, olive-oil 5, greek-yogurt 50
- Whisk the {gram-flour} with 80ml water, the {cumin} and {turmeric} to a smooth batter.
- Stir in finely chopped {onion}, {tomato}, {red-chilli} and {coriander}.
- Cook two pancakes in the {olive-oil}, 2–3 minutes a side. Serve with the {greek-yogurt}.

# Spinach breakfast quesadilla | Mexican | 1 | 5 | 6 | Easy | 1 | 🌮 🍳 🧀 | 85
Scrambled egg, spinach and cheddar in a crisp folded tortilla.
flour-tortilla 62, eggs 100, cheddar 25, spinach 30, salsa 40
- Scramble the {eggs} with the {spinach}.
- Spread over half the {flour-tortilla}, top with grated {cheddar} and fold.
- Dry-fry for 2 minutes a side until crisp. Serve with {salsa}.

# Smoked mackerel & radish rye | British | 1 | 5 | 2 | Easy | 0 | 🐟 🍞 🌿 | 200
Rye toast with soft cheese, flaked mackerel and crunchy radish.
rye-bread 64, mackerel 60, cream-cheese 30, radish 30, dill 2, lemon 5
- Toast the {rye-bread} and spread with the {cream-cheese}.
- Top with flaked {mackerel} and sliced {radish}.
- Finish with {dill} and a squeeze of {lemon}.

# Apple & cinnamon porridge | British | 1 | 3 | 6 | Easy | 0 | 🥣 🍎 🌰 | 25
Creamy oats with stewed apple, cinnamon and walnuts.
oats 50, milk 250, apple 90, cinnamon 1, maple-syrup 10, walnuts 10
- Simmer the {oats} and {milk} with the diced {apple} and {cinnamon} for 5–6 minutes.
- Top with chopped {walnuts} and {maple-syrup}.

# Mocha overnight oats | American | 1 | 5 | 0 | Easy | 0 | ☕ 🥣 🍌 | 25
Coffee and cocoa overnight oats. Breakfast and caffeine together.
oats 50, milk 120, coffee 2, greek-yogurt 80, maple-syrup 10, cocoa 3, banana 59
- Dissolve the {coffee} in 2 tbsp hot water.
- Stir into the {oats}, {milk}, {greek-yogurt}, {cocoa} and {maple-syrup}; chill overnight.
- Top with sliced {banana}.

# Green smoothie bowl | American | 1 | 5 | 0 | Easy | 0 | 🥝 🥬 🥭 | 110
A thick spinach and mango smoothie topped with kiwi and coconut.
banana 118, spinach 40, mango 80, almond-milk 100, chia 10, coconut 5, kiwi 69
- Blend the frozen {banana}, {spinach}, {mango} and {almond-milk} until thick.
- Pour into a bowl and top with sliced {kiwi}, {chia} and {coconut}.

# Berry protein smoothie | British | 1 | 4 | 0 | Easy | 0 | 🍓 🥤 🥛 | 330
Frozen berries, yogurt and whey blended with oats for staying power.
frozen-berries 150, banana 59, greek-yogurt 150, milk 150, whey 15, oats 20
- Blend the {frozen-berries}, {banana}, {greek-yogurt}, {milk}, {whey} and {oats} until smooth.

# Chocolate peanut butter smoothie | American | 1 | 4 | 0 | Easy | 0 | 🍫 🥜 🍌 | 30
Tastes like a milkshake, sweetened only with banana and a date.
banana 118, peanut-butter 15, cocoa 8, milk 250, oats 20, dates 24
- Stone the {dates}.
- Blend with the {banana}, {peanut-butter}, {cocoa}, {milk} and {oats} until smooth.

# Cinnamon French toast & strawberries | French | 2 | 5 | 8 | Easy | 0 | 🍞 🍓 🍁 | 350
Golden eggy bread with fresh strawberries and maple syrup.
sourdough 100, eggs 100, milk 60, cinnamon 1, vanilla 2, butter 8, strawberries 100, maple-syrup 10
- Beat the {eggs}, {milk}, {cinnamon} and {vanilla}.
- Soak the {sourdough} slices for 30 seconds a side.
- Fry in the {butter} for 2–3 minutes a side. Serve with {strawberries} and {maple-syrup}.

# Ham & Gruyère toastie | French | 1 | 3 | 6 | Easy | 0 | 🥪 🧀 🍖 | 40
A croque-monsieur-style toastie with ham, Gruyère and mustard.
wholemeal-bread 72, ham 40, gruyere 30, dijon 5, butter 5
- Spread one slice of {wholemeal-bread} with the {dijon}.
- Fill with the {ham} and grated {gruyere}; top with the second slice.
- Butter the outsides with the {butter} and toast in a pan for 3 minutes a side.

# Green shakshuka | Middle Eastern | 2 | 10 | 20 | Intermediate | 0 | 🍳 🥬 🧀 | 100
Eggs baked in buttery leeks, spinach and kale with feta and dill.
olive-oil 10, leek 150, spinach 150, kale 80, garlic 6, cumin 2, eggs 200, feta 40, dill 5
- Soften the sliced {leek} in the {olive-oil} for 8 minutes; add the {garlic} and {cumin}.
- Stir in the {kale} and {spinach} until wilted.
- Make four wells, crack in the {eggs}, cover and cook for 6 minutes.
- Crumble over the {feta} and scatter with {dill}.

# Garlic mushrooms on toast | British | 1 | 5 | 8 | Easy | 0 | 🍄 🍞 🍳 | 30
Buttery thyme mushrooms on sourdough with a poached egg.
sourdough 50, mushrooms 150, garlic 3, thyme 0.5, butter 8, parsley 3, eggs 50
- Fry the sliced {mushrooms} in the {butter} until golden; add the {garlic} and {thyme}.
- Poach the {eggs} for 3 minutes.
- Pile the mushrooms on toasted {sourdough}, top with the egg and {parsley}.

# Sweet potato & black bean hash | Mexican | 1 | 8 | 15 | Easy | 1 | 🍠 🫘 🥑 | 20
A plant-based hash with crispy sweet potato, peppers and avocado.
sweet-potato 200, black-beans 100, onion 55, red-pepper 75, cumin 1, paprika 1, olive-oil 8, avocado 50, lime 5
- Dice the {sweet-potato} small and fry in the {olive-oil} for 10 minutes.
- Add the {onion}, {red-pepper}, {cumin} and {paprika}; cook for 5 minutes.
- Stir in the {black-beans} to warm through. Top with sliced {avocado} and {lime}.

# Fluffy blueberry pancakes | American | 2 | 10 | 12 | Easy | 0 | 🥞 🫐 🍁 | 220
Thick American-style pancakes studded with blueberries.
flour 120, baking-powder 6, sugar 10, eggs 50, milk 180, butter 15, blueberries 100, maple-syrup 30
- Whisk the {flour}, {baking-powder} and {sugar}; beat in the {eggs}, {milk} and half the melted {butter}.
- Cook ladlefuls in a pan greased with the rest of the butter, dotting with {blueberries}; flip when bubbles appear.
- Serve with {maple-syrup}.

# Lemon & sugar crêpes | French | 2 | 10 | 15 | Intermediate | 0 | 🥞 🍋 ✨ | 55
Thin French pancakes with a squeeze of lemon and a sprinkle of sugar.
flour 100, eggs 100, milk 250, butter 10, lemon 30, sugar 15
- Whisk the {flour}, {eggs} and {milk} to a thin batter; rest for 10 minutes.
- Cook thin crêpes in a hot pan wiped with the {butter}, about 1 minute a side.
- Sprinkle each with {lemon} juice and {sugar} and fold.

# Egg & avocado bagel | American | 1 | 3 | 5 | Easy | 0 | 🥯 🥑 🍳 | 80
A toasted bagel with a soft fried egg, avocado and tomato.
bagel 85, eggs 50, avocado 50, tomato 40, black-pepper 0.3
- Toast the halved {bagel}.
- Fry the {eggs}.
- Fill with smashed {avocado}, sliced {tomato} and the egg; season with {black-pepper}.

# Smoked salmon & cream cheese bagel | American | 1 | 4 | 2 | Easy | 0 | 🥯 🐟 🥒 | 15
The New York classic with cucumber, dill and lemon.
bagel 85, cream-cheese 30, smoked-salmon 50, cucumber 30, dill 2, lemon 5
- Toast the halved {bagel} and spread with the {cream-cheese}.
- Layer on the {smoked-salmon} and sliced {cucumber}.
- Finish with {dill} and a squeeze of {lemon}.

# Honey nut granola with yogurt | American | 8 | 10 | 25 | Easy | 0 | 🥣 🌰 🍯 | 35
A big batch of crunchy granola; each serving comes with Greek yogurt.
oats 200, almonds 50, pumpkin-seeds 30, sunflower-seeds 30, honey 60, coconut-oil 30, cinnamon 2, dried-cranberries 40, greek-yogurt 800
- Heat the oven to 160°C. Warm the {honey} and {coconut-oil} together.
- Toss with the {oats}, chopped {almonds}, {pumpkin-seeds}, {sunflower-seeds} and {cinnamon}; spread on a lined tray.
- Bake for 20–25 minutes, stirring halfway. Cool, then stir in the {dried-cranberries}.
- Serve each portion with 100g {greek-yogurt}.

# Cinnamon quinoa breakfast bowl | American | 1 | 3 | 15 | Easy | 0 | 🥣 🍐 🌰 | 30
Quinoa simmered in almond milk with pear and walnuts. Plant-based.
quinoa 50, almond-milk 200, cinnamon 1, pear 89, walnuts 10, maple-syrup 8
- Simmer the rinsed {quinoa} in the {almond-milk} with the {cinnamon} for 15 minutes.
- Top with diced {pear}, {walnuts} and {maple-syrup}.

# Raspberry chia pudding | American | 1 | 5 | 0 | Easy | 0 | 🍇 🥄 🌰 | 335
Chia set overnight in almond milk with raspberries and almonds.
chia 30, almond-milk 200, maple-syrup 8, raspberries 100, almonds 10
- Whisk the {chia}, {almond-milk} and {maple-syrup}; chill overnight.
- Top with {raspberries} and chopped {almonds}.

# Coconut mango overnight oats | Thai | 1 | 5 | 0 | Easy | 0 | 🥭 🥥 🥣 | 45
Tropical overnight oats with coconut milk, mango and lime.
oats 50, coconut-milk 80, milk 100, mango 100, lime 5, coconut 5
- Mix the {oats}, {coconut-milk} and {milk}; chill overnight.
- Top with diced {mango}, a squeeze of {lime} and {coconut}.

# Veggie egg muffins | Mediterranean | 4 | 10 | 20 | Easy | 0 | 🧁 🍳 🫑 | 60
Make-ahead mini frittatas with spinach, pepper and feta. Two per serving.
eggs 400, spinach 60, red-pepper 75, spring-onion 30, feta 60, black-pepper 0.5, olive-oil 5
- Heat the oven to 190°C and oil an 8-hole muffin tin with the {olive-oil}.
- Beat the {eggs} with {black-pepper}; stir in chopped {spinach}, {red-pepper}, {spring-onion} and crumbled {feta}.
- Divide between the holes and bake for 18–20 minutes. Keeps 3 days in the fridge.

# Spanish tortilla | Spanish | 4 | 10 | 30 | Intermediate | 0 | 🥔 🍳 🧅 | 40
A thick potato and onion omelette. Good warm or cold.
potato 500, onion 110, eggs 300, olive-oil 30, salt 2
- Thinly slice the {potato} and {onion}; cook gently in the {olive-oil} for 20 minutes until soft.
- Beat the {eggs} with the {salt} and stir in the potatoes.
- Cook in a non-stick pan over a low heat for 8 minutes, flip using a plate, and cook 3 minutes more.

# Chorizo breakfast tacos | Mexican | 1 | 5 | 8 | Easy | 2 | 🌮 🍳 🌶️ | 10
Soft corn tacos with chorizo scrambled eggs and salsa.
corn-tortilla 78, eggs 100, chorizo 30, salsa 40, coriander 3, lime 5
- Fry the diced {chorizo} until it releases its oil.
- Add the beaten {eggs} and scramble.
- Fill the warm {corn-tortilla}s and top with {salsa}, {coriander} and {lime}.

# Salmon, rice & miso soup | Japanese | 1 | 5 | 20 | Intermediate | 0 | 🍣 🍚 🥣 | 15
A traditional Japanese breakfast set: grilled salmon, rice and miso soup.
salmon 100, white-rice 60, miso 15, tofu 50, spring-onion 10, soy-sauce 5
- Cook the {white-rice}.
- Brush the {salmon} with the {soy-sauce} and grill for 8–10 minutes.
- Whisk the {miso} into 250ml hot (not boiling) water; add cubed {tofu} and {spring-onion}.

# Ful-style butter beans | Middle Eastern | 2 | 5 | 10 | Easy | 0 | 🫘 🍋 🫓 | 50
Warm crushed beans with cumin, lemon and tomato, scooped up with pitta.
butter-beans 240, garlic 3, cumin 2, lemon 15, olive-oil 15, tomato 100, parsley 5, pitta 60
- Warm the drained {butter-beans} with a splash of water, the {garlic} and {cumin}; crush lightly.
- Stir in the {lemon} and {olive-oil}.
- Top with diced {tomato} and {parsley}; serve with warm {pitta}.

# Greek yogurt with honey & walnuts | Greek | 1 | 2 | 0 | Easy | 0 | 🥛 🍯 🌰 | 45
The simplest Greek breakfast: thick yogurt, honey and walnuts.
greek-yogurt-full 200, honey 15, walnuts 20
- Spoon the {greek-yogurt-full} into a bowl.
- Top with chopped {walnuts} and drizzle with {honey}.

# Walnut banana bread | British | 10 | 15 | 50 | Easy | 0 | 🍌 🍞 🌰 | 35
A moist loaf that uses up ripe bananas. One slice is a serving.
banana 354, flour 200, eggs 100, butter 60, brown-sugar 80, baking-powder 8, cinnamon 2, walnuts 50
- Heat the oven to 180°C and line a loaf tin.
- Mash the {banana}; beat in the melted {butter}, {brown-sugar} and {eggs}.
- Fold in the {flour}, {baking-powder}, {cinnamon} and chopped {walnuts}.
- Bake for 50 minutes until a skewer comes out clean.

# Spinach & feta egg wrap | Greek | 1 | 3 | 5 | Easy | 0 | 🌯 🥬 🧀 | 95
Eggs scrambled with spinach and feta, rolled in a warm wrap.
eggs 100, spinach 40, feta 25, flour-tortilla 62, olive-oil 3
- Wilt the {spinach} in the {olive-oil}.
- Add the beaten {eggs} and scramble; crumble in the {feta}.
- Roll up in the warmed {flour-tortilla}.

# Smoked haddock kedgeree | British | 3 | 10 | 25 | Intermediate | 1 | 🍚 🐟 🥚 | 45
Curried rice with flaked haddock, peas and soft-boiled eggs.
white-rice 150, haddock 300, eggs 200, onion 110, curry-powder 6, butter 15, peas 100, parsley 5, lemon 15
- Poach the {haddock} in simmering water for 6 minutes; flake.
- Boil the {eggs} for 7 minutes; cool and quarter.
- Soften the {onion} in the {butter}, add the {curry-powder} and {white-rice}, then 300ml water; simmer covered for 12 minutes, adding the {peas} for the last 3.
- Fold in the fish, top with eggs, {parsley} and {lemon}.

# PB&J porridge | American | 1 | 3 | 6 | Easy | 0 | 🥣 🥜 🍓 | 350
Creamy oats swirled with peanut butter, jam and fresh raspberries.
oats 50, milk 250, peanut-butter 15, jam 15, raspberries 50
- Simmer the {oats} and {milk} for 5 minutes.
- Swirl through the {peanut-butter} and {jam}; top with {raspberries}.

# Kefir berry smoothie | British | 1 | 3 | 0 | Easy | 0 | 🥤 🫐 🍌 | 280
Tangy kefir blended with berries, banana and oats.
kefir 250, frozen-berries 120, banana 59, oats 20, honey 5
- Blend the {kefir}, {frozen-berries}, {banana}, {oats} and {honey} until smooth.

# Tropical yogurt smoothie | Caribbean | 1 | 4 | 0 | Easy | 0 | 🍍 🥭 🥥 | 50
Pineapple, mango and coconut with a squeeze of lime.
pineapple 100, mango 100, banana 59, coconut-milk 60, greek-yogurt 100, lime 5
- Blend the {pineapple}, {mango}, {banana}, {coconut-milk}, {greek-yogurt} and {lime} until smooth.

# Savoury parmesan oats | Italian | 1 | 3 | 8 | Easy | 0 | 🥣 🍳 🧀 | 60
Oats cooked in stock with spinach and parmesan, topped with an egg.
oats 50, veg-stock 250, spinach 40, eggs 50, parmesan 10, black-pepper 0.3
- Simmer the {oats} in the {veg-stock} for 5 minutes; stir in the {spinach} and {parmesan}.
- Poach or fry the {eggs}.
- Top the oats with the egg and {black-pepper}.

# Apple pie baked oats | American | 1 | 5 | 25 | Easy | 0 | 🍎 🥣 🥧 | 30
Oats baked with apple and cinnamon until set like a pudding.
oats 50, apple 90, eggs 50, milk 100, baking-powder 2, cinnamon 1, maple-syrup 10
- Heat the oven to 190°C.
- Mix the {oats}, grated {apple}, {eggs}, {milk}, {baking-powder}, {cinnamon} and {maple-syrup} in a small dish.
- Bake for 25 minutes until golden and set.

# Chocolate baked oats | American | 1 | 5 | 25 | Easy | 0 | 🍫 🥣 🍌 | 20
A cakey, chocolatey baked oat bowl with a melting centre.
oats 50, banana 59, cocoa 8, eggs 50, milk 100, baking-powder 2, dark-chocolate 10
- Heat the oven to 190°C.
- Blend the {oats}, {banana}, {cocoa}, {eggs}, {milk} and {baking-powder}.
- Pour into a small dish, press the {dark-chocolate} into the middle and bake for 22–25 minutes.

# Bacon & egg muffin | British | 1 | 3 | 8 | Easy | 0 | 🥯 🥓 🍳 | 30
A homemade breakfast muffin with bacon, egg and cheddar.
english-muffin 57, eggs 50, bacon 25, cheddar 15, tomato 30
- Grill the {bacon} and fry the {eggs}.
- Toast the split {english-muffin}.
- Fill with the bacon, egg, sliced {cheddar} and {tomato}.

# Mushroom & spinach omelette | French | 1 | 5 | 6 | Easy | 0 | 🍳 🍄 🥬 | 75
A soft folded omelette filled with mushrooms, spinach and cheddar.
eggs 150, mushrooms 80, spinach 40, cheddar 20, olive-oil 5
- Fry the sliced {mushrooms} in the {olive-oil}; add the {spinach} to wilt, then set aside.
- Pour the beaten {eggs} into the pan, swirl and cook until almost set.
- Fill with the veg and grated {cheddar}, then fold.

# Eggs, asparagus & ham soldiers | British | 1 | 5 | 6 | Intermediate | 0 | 🥚 🌿 🍖 | 90
Soft-boiled eggs with ham-wrapped asparagus for dipping.
eggs 100, asparagus 120, ham 40, sourdough 50, lemon 5, butter 5
- Boil the {eggs} for 6 minutes.
- Blanch the {asparagus} for 2 minutes; wrap each spear in {ham}.
- Serve with buttered {sourdough} soldiers ({butter}) and a squeeze of {lemon} over the asparagus.

# Egg banh mi | Vietnamese | 1 | 8 | 5 | Easy | 1 | 🥖 🍳 🥕 | 120
Fried egg in crusty bread with quick-pickled carrot, cucumber and chilli.
sourdough 70, eggs 100, carrot 40, cucumber 40, coriander 3, red-chilli 5, mayonnaise 10, soy-sauce 3, lime 5
- Toss the ribboned {carrot} and {cucumber} with the {lime}.
- Fry the {eggs} and season with the {soy-sauce}.
- Spread the {sourdough} with {mayonnaise}, fill with eggs, pickles, {coriander} and sliced {red-chilli}.

# Cabbage & bacon okonomiyaki | Japanese | 1 | 10 | 10 | Intermediate | 0 | 🥞 🥬 🥓 | 30
A savoury Japanese cabbage pancake with a sweet-salty drizzle.
flour 60, eggs 100, cabbage 150, spring-onion 20, bacon 40, mayonnaise 10, soy-sauce 10, olive-oil 5
- Mix the {flour}, {eggs} and 3 tbsp water; fold in the shredded {cabbage} and {spring-onion}.
- Fry in the {olive-oil}, lay the {bacon} on top, and cook 5 minutes a side.
- Drizzle with {soy-sauce} and {mayonnaise}.

# Menemen | Middle Eastern | 1 | 5 | 12 | Easy | 1 | 🍳 🍅 🫑 | 5
Turkish soft-scrambled eggs with peppers and tomatoes.
olive-oil 10, red-pepper 150, onion 55, tomato 300, eggs 150, chilli-powder 1, parsley 3, sourdough 50
- Soften the {onion} and {red-pepper} in the {olive-oil}.
- Add the chopped {tomato} and {chilli-powder}; cook down for 5 minutes.
- Stir in the beaten {eggs} until just set. Top with {parsley}; serve with {sourdough}.

# Strawberry almond butter toast | American | 1 | 3 | 2 | Easy | 0 | 🍓 🍞 🌰 | 355
Toasted sourdough with almond butter, sliced strawberries and chia.
sourdough 50, almond-butter 15, strawberries 80, chia 3
- Toast the {sourdough}.
- Spread with the {almond-butter}, top with sliced {strawberries} and sprinkle with {chia}.

# Sweet potato toast with egg | American | 1 | 5 | 12 | Easy | 0 | 🍠 🥑 🍳 | 25
Toasted sweet potato slices topped with avocado and a fried egg.
sweet-potato 150, avocado 50, eggs 50, chilli-powder 0.3, lime 5
- Slice the {sweet-potato} lengthways 5mm thick; toast twice on high (or roast 12 minutes) until tender.
- Mash the {avocado} with the {lime}.
- Top the slices with avocado, a fried {eggs} and {chilli-powder}.

# Chicken & apple breakfast patties | American | 2 | 10 | 12 | Easy | 0 | 🍗 🍏 🥬 | 70
Homemade breakfast sausage patties with apple and thyme.
chicken-mince 250, apple 90, thyme 0.5, nutmeg 0.2, black-pepper 0.3, olive-oil 5, spinach 100
- Mix the {chicken-mince} with grated {apple}, {thyme}, {nutmeg} and {black-pepper}; shape 6 patties.
- Fry in the {olive-oil} for 5–6 minutes a side until cooked through.
- Wilt the {spinach} in the same pan and serve alongside.

# Bacon, egg & avocado plate | British | 1 | 3 | 8 | Easy | 0 | 🥓 🍳 🥑 | 110
A low-carb plate of bacon, eggs, avocado and wilted spinach.
eggs 100, bacon 40, avocado 75, spinach 40, olive-oil 3
- Grill the {bacon}.
- Fry the {eggs} in the {olive-oil}; wilt the {spinach} in the pan.
- Serve with sliced {avocado}.

# Smoked salmon & cream cheese omelette | French | 1 | 3 | 5 | Easy | 0 | 🍳 🐟 🌿 | 20
A rich, low-carb omelette folded around salmon and soft cheese.
eggs 150, smoked-salmon 40, cream-cheese 30, chives 2, butter 5
- Melt the {butter} and add the beaten {eggs}; cook until nearly set.
- Dot with {cream-cheese}, lay over the {smoked-salmon} and {chives}, then fold.

# Vegan chocolate PB overnight oats | American | 1 | 5 | 0 | Easy | 0 | 🍫 🥜 🥣 | 345
Chocolate oats soaked in soya milk with peanut butter and raspberries.
oats 50, soy-milk 150, peanut-butter 15, cocoa 5, maple-syrup 10, raspberries 60, chia 10
- Mix the {oats}, {soy-milk}, {cocoa}, {chia} and {maple-syrup}; chill overnight.
- Top with {peanut-butter} and {raspberries}.

# Buckwheat berry porridge | British | 1 | 3 | 12 | Easy | 0 | 🥣 🫐 🌻 | 265
A nutty, naturally gluten-free porridge with blueberries and seeds.
buckwheat 50, almond-milk 200, cinnamon 1, blueberries 80, maple-syrup 8, sunflower-seeds 10
- Simmer the {buckwheat} in the {almond-milk} with the {cinnamon} for 12 minutes until creamy.
- Top with {blueberries}, {sunflower-seeds} and {maple-syrup}.

# Pear & ginger yogurt bowl | British | 1 | 4 | 0 | Easy | 0 | 🍐 🥛 🌻 | 60
Greek yogurt with diced pear, a pinch of ginger and toasted seeds.
greek-yogurt 200, pear 178, ground-ginger 0.5, pumpkin-seeds 10, honey 8
- Spoon the {greek-yogurt} into a bowl.
- Top with diced {pear}, {pumpkin-seeds}, a pinch of {ground-ginger} and the {honey}.

# Plum & almond porridge | British | 1 | 3 | 8 | Easy | 0 | 🥣 🍑 🌰 | 300
Porridge topped with quick-stewed plums and toasted almonds.
oats 50, milk 250, plum 132, brown-sugar 5, cinnamon 0.5, almonds 10
- Simmer the halved {plum}s with the {brown-sugar}, {cinnamon} and a splash of water for 5 minutes.
- Cook the {oats} in the {milk} for 5 minutes.
- Top with the plums and chopped {almonds}.

# Cheese & chive scrambled eggs on muffin | British | 1 | 3 | 5 | Easy | 0 | 🍳 🧀 🥯 | 55
Fluffy cheesy eggs on a toasted English muffin.
eggs 150, cheddar 20, chives 2, english-muffin 57, butter 5
- Toast the split {english-muffin}.
- Scramble the {eggs} in the {butter}; stir in grated {cheddar} and {chives} at the end.
- Spoon onto the muffin.

# Turkey & pepper breakfast scramble | American | 1 | 5 | 10 | Easy | 1 | 🍳 🫑 🌶️ | 15
High-protein scramble with lean turkey mince and peppers.
turkey-mince 100, eggs 100, red-pepper 75, spring-onion 15, paprika 1, olive-oil 5
- Brown the {turkey-mince} in the {olive-oil} with the {paprika} until cooked through.
- Add the diced {red-pepper} and {spring-onion} for 2 minutes.
- Pour in the beaten {eggs} and scramble until just set.
`)
