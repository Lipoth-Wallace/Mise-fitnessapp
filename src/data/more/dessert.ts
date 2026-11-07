import { parseRecipes } from '../parse'

export default parseRecipes('dessert', `
# Sticky date pudding | British | 8 | 20 | 35 | Intermediate | 0 | 🍮 🟤 🍯 | 25
A sticky toffee-style sponge sweetened with dates, with a little cream.
dates 200, flour 150, baking-powder 6, eggs 100, butter 60, brown-sugar 100, vanilla 5, double-cream 100
- Heat the oven to 180°C. Soak the stoned {dates} in 150ml boiling water for 10 minutes, then mash.
- Beat the {butter} and {brown-sugar}; add the {eggs}, {vanilla} and dates.
- Fold in the {flour} and {baking-powder}; bake in a lined tin for 30–35 minutes.
- Serve warm with a drizzle of {double-cream}.

# Classic apple crumble | British | 6 | 20 | 35 | Easy | 0 | 🍎 🥧 🌾 | 30
Soft cinnamon apples under a buttery oat crumble.
apple 900, sugar 30, cinnamon 2, flour 150, butter 80, brown-sugar 60, oats 50, greek-yogurt 300
- Peel and slice the {apple}s; toss with the {sugar} and {cinnamon} in a dish.
- Rub the {butter} into the {flour}; stir in the {brown-sugar} and {oats}.
- Scatter over the apples and bake at 190°C for 35 minutes.
- Serve with {greek-yogurt}.

# Strawberry Eton mess | British | 4 | 15 | 0 | Easy | 0 | 🍓 🥛 ✨ | 350
Strawberries folded through yogurt and cream with crushed biscuits.
strawberries 400, greek-yogurt 300, double-cream 100, sugar 15, vanilla 3, digestives 60
- Halve the {strawberries} and toss with the {sugar}; leave 10 minutes.
- Whip the {double-cream} to soft peaks; fold into the {greek-yogurt} with the {vanilla}.
- Fold through the strawberries and crushed {digestives}.

# Lemon posset with raspberries | British | 4 | 10 | 5 | Easy | 0 | 🍋 🍮 🍇 | 55
Three-ingredient set lemon cream. Rich, so portions are small.
double-cream 300, sugar 75, lemon 60, lemon-zest 5, raspberries 120
- Bring the {double-cream} and {sugar} to the boil and bubble for 3 minutes.
- Off the heat, stir in the {lemon} juice and {lemon-zest}.
- Pour into four small glasses and chill for 3 hours. Top with {raspberries}.

# Fudgy chocolate brownies | American | 12 | 15 | 25 | Easy | 0 | 🍫 🟫 ✨ | 20
Dense, fudgy brownies. One square per serving.
dark-chocolate 150, butter 120, sugar 150, eggs 150, flour 80, cocoa 20
- Heat the oven to 180°C and line a 20cm tin.
- Melt the {dark-chocolate} and {butter}; whisk in the {sugar} and {eggs}.
- Fold in the {flour} and {cocoa}; bake for 22–25 minutes until just set.

# Black bean protein brownies | American | 9 | 10 | 25 | Easy | 0 | 🍫 🫘 ✨ | 15
Blended bean brownies: gluten-free and surprisingly fudgy.
black-beans 400, cocoa 30, eggs 100, maple-syrup 80, coconut-oil 40, baking-powder 5, dark-chocolate 50, vanilla 5
- Heat the oven to 180°C and line a 20cm tin.
- Blend the drained {black-beans}, {cocoa}, {eggs}, {maple-syrup}, melted {coconut-oil}, {baking-powder} and {vanilla} until smooth.
- Stir in chopped {dark-chocolate}; bake for 25 minutes.

# Banoffee pots | British | 4 | 15 | 0 | Easy | 0 | 🍌 🍮 🍪 | 35
Biscuit, caramel, banana and cream layered in glasses.
digestives 120, butter 40, condensed-milk 200, banana 236, double-cream 150, cocoa 3
- Mix the crushed {digestives} with the melted {butter}; press into four glasses.
- Simmer the {condensed-milk} in a pan, stirring, for 8–10 minutes until a light caramel; cool.
- Layer the caramel and sliced {banana}; top with whipped {double-cream} and a dusting of {cocoa}.

# Tiramisu pots | Italian | 4 | 20 | 0 | Easy | 0 | ☕ 🍰 🍫 | 25
Coffee-soaked biscuits under a mascarpone-style cream.
coffee 6, digestives 80, cream-cheese 200, double-cream 150, sugar 50, cocoa 8, vanilla 3
- Dissolve the {coffee} in 100ml hot water; dip the {digestives} and divide between glasses.
- Whip the {double-cream}, {cream-cheese}, {sugar} and {vanilla} until thick.
- Spoon over the biscuits; chill 2 hours and dust with {cocoa}.

# Affogato | Italian | 4 | 5 | 0 | Easy | 0 | ☕ 🍨 🍫 | 30
Hot coffee poured over vanilla ice cream. Done in five minutes.
ice-cream 240, coffee 4, dark-chocolate 20
- Scoop the {ice-cream} into four glasses.
- Make 200ml strong {coffee} and pour over.
- Grate over the {dark-chocolate}.

# Spiced poached pears | French | 4 | 10 | 25 | Easy | 0 | 🍐 🍷 🍊 | 20
Pears gently poached in orange, cinnamon and vanilla syrup.
pear 712, sugar 80, cinnamon 2, vanilla 3, orange 140, greek-yogurt 200
- Bring 600ml water, the {sugar}, {cinnamon}, {vanilla} and juice and zest of the {orange} to a simmer.
- Add the peeled {pear}s and poach for 20–25 minutes until tender.
- Reduce the syrup by half and serve with {greek-yogurt}.

# Cherry clafoutis | French | 6 | 15 | 35 | Easy | 0 | 🍒 🥞 ✨ | 350
Cherries baked in a soft vanilla custard batter.
cherries 400, eggs 150, milk 250, flour 60, sugar 60, vanilla 3, butter 10
- Heat the oven to 190°C and butter a dish with the {butter}.
- Scatter in the stoned {cherries}.
- Whisk the {eggs}, {milk}, {flour}, {sugar} and {vanilla}; pour over and bake for 35 minutes.

# Silken tofu chocolate mousse | French | 4 | 10 | 0 | Easy | 0 | 🍫 🍇 🥄 | 330
A rich, airy mousse made in a blender. Plant-based.
silken-tofu 350, dark-chocolate 150, maple-syrup 30, vanilla 3, raspberries 100
- Melt the {dark-chocolate}.
- Blend with the {silken-tofu}, {maple-syrup} and {vanilla} until silky.
- Chill for an hour and top with {raspberries}.

# Mexican chocolate rice pudding | Mexican | 4 | 5 | 35 | Easy | 0 | 🍚 🍫 🌶️ | 20
Creamy chocolate rice pudding warmed with cinnamon and a hint of chilli.
white-rice 100, milk 800, sugar 50, cocoa 20, cinnamon 2, chilli-powder 0.5, vanilla 3, dark-chocolate 30
- Simmer the {white-rice} in the {milk} with the {cinnamon} for 30 minutes, stirring often.
- Stir in the {sugar}, {cocoa}, {chilli-powder}, {vanilla} and {dark-chocolate} until melted.

# Mango & lime yogurt fool | Indian | 4 | 10 | 0 | Easy | 0 | 🥭 🥛 🍋 | 45
A lassi-inspired dessert of puréed mango swirled through yogurt.
mango 300, greek-yogurt 300, honey 30, lime 15, almonds 20
- Purée the {mango} with the {lime}.
- Sweeten the {greek-yogurt} with the {honey} and swirl through the mango.
- Top with chopped {almonds}.

# Kheer | Indian | 4 | 5 | 40 | Easy | 0 | 🍚 🥛 🌰 | 40
Indian rice pudding with almonds, raisins and nutmeg.
white-rice 80, milk 900, sugar 60, almonds 30, raisins 30, nutmeg 0.5
- Simmer the {white-rice} in the {milk} for 35 minutes, stirring often, until thick.
- Stir in the {sugar}, {raisins} and {nutmeg}.
- Serve warm or cold, topped with flaked {almonds}.

# Gajar halwa | Indian | 6 | 15 | 50 | Intermediate | 0 | 🥕 🥛 🌰 | 25
A slow-cooked carrot pudding, rich with milk and butter.
carrot 600, milk 600, sugar 80, butter 30, almonds 30, raisins 30
- Simmer the grated {carrot} in the {milk} for 40 minutes until the milk is absorbed.
- Stir in the {butter} and {sugar}; cook 10 minutes more.
- Fold in the {raisins} and {almonds}.

# Miso caramel bananas | Japanese | 4 | 5 | 8 | Easy | 0 | 🍌 🍨 ✨ | 40
Pan-caramelised bananas with a salty miso glaze and ice cream.
banana 472, butter 30, brown-sugar 40, miso 10, ice-cream 200, sesame-seeds 5
- Melt the {butter} and {brown-sugar} until bubbling; whisk in the {miso}.
- Add the halved {banana}s and cook 2 minutes a side.
- Serve with {ice-cream} and {sesame-seeds}.

# Ginger-poached pears with sesame | Chinese | 4 | 10 | 25 | Easy | 0 | 🍐 🫚 🍯 | 50
Pears simmered in honey and ginger, finished with toasted sesame.
pear 712, ginger 20, honey 60, orange 140, sesame-seeds 10, greek-yogurt 200
- Simmer 500ml water with the sliced {ginger}, {honey} and {orange} juice.
- Add the peeled {pear}s and poach 20–25 minutes until tender.
- Serve with {greek-yogurt} and toasted {sesame-seeds}.

# Banana in sweet coconut milk | Thai | 4 | 5 | 10 | Easy | 0 | 🍌 🥥 ✨ | 50
Kluay buat chee: warm bananas in lightly salted coconut milk. Plant-based.
banana 472, coconut-milk 400, sugar 40, salt 1, sesame-seeds 5
- Warm the {coconut-milk} with the {sugar} and {salt}.
- Add the sliced {banana} and simmer 5 minutes.
- Serve warm, topped with {sesame-seeds}.

# Honey cinnamon pear compote | Korean | 4 | 10 | 20 | Easy | 0 | 🍐 🍯 🌰 | 35
Inspired by Korean steamed pears: soft pears in honey, ginger and cinnamon.
pear 712, honey 40, cinnamon 2, ginger 15, pine-nuts 15
- Simmer the diced {pear} with the {honey}, {cinnamon}, sliced {ginger} and 150ml water for 20 minutes.
- Serve warm, topped with toasted {pine-nuts}.

# Vietnamese coffee ice pops | Vietnamese | 6 | 10 | 0 | Easy | 0 | ☕ 🧊 🥛 | 30
Coffee and condensed milk frozen into creamy lollies.
coffee 8, condensed-milk 200, double-cream 200, milk 200
- Dissolve the {coffee} in 3 tbsp hot water.
- Whisk with the {condensed-milk}, {double-cream} and {milk}.
- Pour into moulds and freeze for 6 hours.

# Flourless orange & almond cake | Middle Eastern | 10 | 15 | 60 | Intermediate | 0 | 🍊 🌰 🍰 | 35
A moist, naturally gluten-free cake made with whole boiled oranges.
orange 280, eggs 300, almonds 250, sugar 180, baking-powder 5
- Simmer the whole {orange}s for 1 hour until soft; cool and blend to a purée.
- Heat the oven to 180°C. Whisk the {eggs} and {sugar}; fold in the ground {almonds}, {baking-powder} and orange purée.
- Bake in a lined 20cm tin for 55–60 minutes.

# Baked peaches with honey yogurt | Greek | 4 | 10 | 20 | Easy | 0 | 🍑 🍯 🌰 | 30
Roasted peaches with cinnamon, thick yogurt and walnuts.
peach 600, honey 30, cinnamon 1, greek-yogurt 300, walnuts 40
- Halve the {peach}es, drizzle with half the {honey} and the {cinnamon}; bake at 190°C for 20 minutes.
- Serve with the {greek-yogurt}, the rest of the honey and chopped {walnuts}.

# Orange & cinnamon custard pots | Spanish | 4 | 10 | 10 | Intermediate | 0 | 🍮 🍊 ✨ | 40
Silky crema catalana-style custards scented with citrus and cinnamon.
milk 500, eggs 150, sugar 70, cornflour 25, cinnamon 1, lemon-zest 3
- Warm the {milk} with the {cinnamon} and {lemon-zest}.
- Whisk the {eggs}, {sugar} and {cornflour}; pour in the hot milk, whisking.
- Return to the pan and stir over a low heat until thick. Pour into pots and chill.

# Coconut rice pudding with mango | Caribbean | 4 | 5 | 35 | Easy | 0 | 🍚 🥥 🥭 | 45
Creamy coconut rice topped with fresh mango and lime.
white-rice 100, coconut-milk 400, milk 400, sugar 50, mango 300, lime 15
- Simmer the {white-rice} with the {coconut-milk}, {milk} and {sugar} for 30–35 minutes, stirring often.
- Top with diced {mango} and a squeeze of {lime}.

# Peanut butter cookies | American | 12 | 10 | 12 | Easy | 0 | 🍪 🥜 🍫 | 30
Three-ingredient cookies with chocolate chunks. Two cookies per serving.
peanut-butter 250, sugar 150, eggs 50, dark-chocolate 40
- Heat the oven to 180°C.
- Mix the {peanut-butter}, {sugar} and {eggs}; stir in chopped {dark-chocolate}.
- Roll into 24 balls, flatten on lined trays and bake for 10–12 minutes.

# Oat & raisin cookies | British | 12 | 15 | 12 | Easy | 0 | 🍪 🌾 🍇 | 30
Chewy cookies with cinnamon and plump raisins. Two cookies per serving.
oats 150, flour 100, butter 100, brown-sugar 100, eggs 50, raisins 80, cinnamon 2, baking-powder 4
- Heat the oven to 180°C.
- Beat the {butter} and {brown-sugar}; beat in the {eggs}.
- Stir in the {oats}, {flour}, {baking-powder}, {cinnamon} and {raisins}.
- Make 24 balls and bake for 10–12 minutes.

# Lemon blueberry muffins | American | 12 | 15 | 22 | Easy | 0 | 🧁 🫐 🍋 | 240
Light muffins made with Greek yogurt and bursting with blueberries.
flour 250, baking-powder 10, sugar 100, eggs 100, greek-yogurt 150, milk 100, butter 60, blueberries 150, lemon-zest 3
- Heat the oven to 200°C and line a 12-hole tin.
- Mix the {flour}, {baking-powder} and {sugar}.
- Whisk the {eggs}, {greek-yogurt}, {milk}, melted {butter} and {lemon-zest}; stir in with the {blueberries}.
- Divide between the cases and bake 20–22 minutes.

# Carrot cake bars | British | 12 | 20 | 30 | Easy | 0 | 🥕 🍰 🌰 | 30
Spiced carrot cake with walnuts and a cream cheese topping.
carrot 200, flour 180, baking-powder 6, cinnamon 3, nutmeg 1, eggs 100, brown-sugar 120, olive-oil 100, walnuts 50, cream-cheese 150, sugar 30
- Heat the oven to 180°C and line a 20cm tin.
- Whisk the {eggs}, {brown-sugar} and {olive-oil}; stir in the grated {carrot}.
- Fold in the {flour}, {baking-powder}, {cinnamon}, {nutmeg} and chopped {walnuts}; bake 30 minutes.
- Beat the {cream-cheese} with the {sugar}; spread over the cooled cake.

# Lemon drizzle loaf | British | 10 | 15 | 45 | Easy | 0 | 🍋 🍰 ✨ | 55
A tangy, sugar-crusted lemon loaf.
flour 200, baking-powder 8, sugar 175, butter 175, eggs 150, lemon-zest 6, lemon 45
- Heat the oven to 180°C and line a loaf tin.
- Beat the {butter} and 125g of the {sugar}; beat in the {eggs} and {lemon-zest}.
- Fold in the {flour} and {baking-powder}; bake 45 minutes.
- Mix the {lemon} juice with the remaining sugar and spoon over the hot cake.

# Scones with jam & cream | British | 8 | 15 | 15 | Intermediate | 0 | 🍪 🍓 🥛 | 10
Fluffy scones served the Devon way: cream first, then jam.
flour 350, baking-powder 15, butter 85, sugar 30, milk 175, eggs 50, jam 120, double-cream 150
- Heat the oven to 220°C. Rub the {butter} into the {flour} and {baking-powder}; stir in the {sugar}.
- Add the {milk} and most of the beaten {eggs}; bring together gently.
- Pat out 3cm thick, cut 8 rounds, brush with the rest of the egg and bake 12–15 minutes.
- Serve with whipped {double-cream} and {jam}.

# Bread & butter pudding | British | 6 | 15 | 40 | Easy | 0 | 🍞 🍮 🍇 | 35
A thrifty classic: buttered bread baked in vanilla custard.
sourdough 300, butter 30, raisins 60, eggs 150, milk 400, double-cream 100, sugar 60, nutmeg 1, vanilla 3
- Butter the {sourdough} slices with the {butter}, halve and layer in a dish with the {raisins}.
- Whisk the {eggs}, {milk}, {double-cream}, {sugar} and {vanilla}; pour over and soak 15 minutes.
- Grate over the {nutmeg} and bake at 180°C for 35–40 minutes.

# Warm berry compote & yogurt | British | 4 | 5 | 10 | Easy | 0 | 🫐 🥛 🌰 | 290
Quick warm berries over thick yogurt with toasted almonds.
frozen-berries 400, honey 30, vanilla 2, greek-yogurt 400, almonds 30
- Simmer the {frozen-berries} with the {honey} and {vanilla} for 8 minutes.
- Spoon over the {greek-yogurt} and top with toasted {almonds}.

# No-churn raspberry frozen yogurt | American | 4 | 5 | 0 | Easy | 0 | 🍇 🧊 🥛 | 340
Blitzed frozen raspberries and yogurt, scooped straight away.
raspberries 300, greek-yogurt 300, honey 50, lemon 10
- Freeze the {raspberries} overnight.
- Blend with the {greek-yogurt}, {honey} and {lemon} until thick and smooth. Eat straight away or freeze for 30 minutes.

# Chocolate-dipped banana pops | American | 6 | 15 | 0 | Easy | 0 | 🍌 🍫 🥜 | 30
Frozen banana halves dipped in chocolate with coconut and peanuts.
banana 354, dark-chocolate 100, coconut 15, peanuts 20
- Halve the {banana}s, push in lolly sticks and freeze for an hour.
- Dip in melted {dark-chocolate} and roll in {coconut} and chopped {peanuts}.
- Freeze again until set.

# No-bake chocolate oat bars | American | 12 | 15 | 0 | Easy | 0 | 🍫 🌾 🥜 | 25
Chewy peanut butter oat bars topped with chocolate.
oats 200, peanut-butter 120, honey 100, cocoa 20, dark-chocolate 100, coconut-oil 20
- Warm the {peanut-butter} and {honey}; stir in the {oats} and {cocoa}.
- Press into a lined 20cm tin.
- Melt the {dark-chocolate} with the {coconut-oil}, pour over and chill until set.

# Strawberry cheesecake pots | American | 6 | 20 | 0 | Easy | 0 | 🍓 🍰 🍪 | 350
No-bake cheesecake pots, lightened with yogurt.
digestives 100, butter 40, cream-cheese 250, greek-yogurt 150, sugar 50, vanilla 3, strawberries 250
- Mix the crushed {digestives} with the melted {butter}; press into six glasses.
- Beat the {cream-cheese}, {greek-yogurt}, {sugar} and {vanilla} until smooth; spoon over.
- Chill 2 hours and top with sliced {strawberries}.

# Key lime pots | American | 6 | 15 | 0 | Easy | 0 | 🍋 🥧 🍪 | 90
Tangy lime cream set on a biscuit base.
digestives 100, butter 40, condensed-milk 250, lime 90, double-cream 150, lemon-zest 2
- Mix the crushed {digestives} and melted {butter}; press into six glasses.
- Whisk the {condensed-milk}, {double-cream} and {lime} juice until it thickens.
- Spoon over the bases, top with {lemon-zest} and chill 2 hours.

# Spiced plum crumble | British | 6 | 15 | 35 | Easy | 0 | 🍑 🥧 🌾 | 320
Tart plums under an oaty crumble.
plum 660, brown-sugar 30, cinnamon 1, flour 100, oats 60, butter 70, sugar 40, greek-yogurt 300
- Halve and stone the {plum}s; toss with the {brown-sugar} and {cinnamon} in a dish.
- Rub the {butter} into the {flour}; stir in the {oats} and {sugar}.
- Scatter over and bake at 190°C for 35 minutes. Serve with {greek-yogurt}.

# Chocolate orange pots | British | 6 | 10 | 5 | Easy | 0 | 🍫 🍊 🥄 | 25
Silky chocolate ganache pots with orange zest.
dark-chocolate 120, double-cream 200, orange 140, cocoa 5, sugar 10
- Heat the {double-cream} with the {sugar} and the zest of the {orange} until steaming.
- Pour over the chopped {dark-chocolate}; stir until smooth, adding a little orange juice.
- Pour into six small pots, chill 2 hours and dust with {cocoa}.

# Watermelon, strawberry & mint salad | Mexican | 4 | 10 | 0 | Easy | 0 | 🍉 🍓 🌿 | 355
Chilled fruit with lime and mint. Very refreshing.
watermelon 600, mint 10, lime 15, strawberries 200, honey 10
- Cube the {watermelon} and halve the {strawberries}.
- Toss with the {lime}, {honey} and torn {mint}.

# Tropical fruit salad | Caribbean | 4 | 15 | 0 | Easy | 0 | 🥭 🍍 🥝 | 50
Mango, pineapple and kiwi with lime and toasted coconut. Plant-based.
mango 300, pineapple 300, kiwi 207, lime 15, coconut 15, mint 5
- Cube the {mango}, {pineapple} and {kiwi}.
- Toss with the {lime} and {mint}; top with toasted {coconut}.

# Cinnamon baked pears with granola | British | 2 | 5 | 25 | Easy | 0 | 🍐 🌾 🥛 | 35
Soft baked pear halves with a crunchy oat topping.
pear 356, cinnamon 1, maple-syrup 20, oats 40, walnuts 20, greek-yogurt 200
- Halve and core the {pear}s.
- Mix the {oats}, chopped {walnuts}, {cinnamon} and {maple-syrup}; pile onto the pears.
- Bake at 190°C for 25 minutes. Serve with {greek-yogurt}.

# Dark chocolate fruit & nut bark | British | 10 | 10 | 0 | Easy | 0 | 🍫 🌰 🍒 | 20
Snappable dark chocolate with almonds, cranberries and seeds.
dark-chocolate 200, almonds 40, dried-cranberries 40, pumpkin-seeds 20
- Melt the {dark-chocolate} and spread thinly on a lined tray.
- Scatter with chopped {almonds}, {dried-cranberries} and {pumpkin-seeds}.
- Chill until set and break into 20 pieces.

# Coconut macaroons | British | 12 | 15 | 20 | Easy | 0 | 🥥 🍪 🍫 | 40
Chewy coconut biscuits dipped in dark chocolate.
coconut 200, condensed-milk 200, eggs 50, vanilla 3, dark-chocolate 50
- Heat the oven to 170°C.
- Mix the {coconut}, {condensed-milk}, {vanilla} and whisked {eggs} (white only).
- Scoop 24 mounds onto lined trays; bake 18–20 minutes until golden.
- Dip the bases in melted {dark-chocolate}.

# Sticky ginger cake | British | 12 | 15 | 40 | Easy | 0 | 🍰 🫚 🍯 | 30
A dark, moist ginger cake that gets better after a day.
flour 225, ground-ginger 6, cinnamon 2, baking-powder 8, butter 100, brown-sugar 100, honey 100, milk 150, eggs 100
- Heat the oven to 170°C and line a 20cm tin.
- Melt the {butter}, {brown-sugar} and {honey}; cool slightly, then whisk in the {milk} and {eggs}.
- Fold into the {flour}, {baking-powder}, {ground-ginger} and {cinnamon}; bake 40 minutes.

# Chocolate chip banana muffins | American | 12 | 15 | 22 | Easy | 0 | 🧁 🍌 🍫 | 30
Soft banana muffins with melting chocolate chips.
banana 354, flour 200, baking-powder 8, eggs 100, brown-sugar 80, olive-oil 60, milk 60, dark-chocolate 60
- Heat the oven to 190°C and line a 12-hole tin.
- Mash the {banana}; whisk in the {eggs}, {brown-sugar}, {olive-oil} and {milk}.
- Fold in the {flour}, {baking-powder} and chopped {dark-chocolate}; bake 20–22 minutes.

# Cherry & almond yogurt pots | French | 4 | 10 | 0 | Easy | 0 | 🍒 🥛 🌰 | 345
Juicy cherries over vanilla yogurt with toasted almonds.
cherries 300, greek-yogurt 400, honey 20, almonds 30, vanilla 2
- Stone and halve the {cherries}.
- Sweeten the {greek-yogurt} with the {honey} and {vanilla}.
- Layer in glasses with the cherries and toasted {almonds}.

# Two-ingredient mango sorbet | Thai | 4 | 5 | 0 | Easy | 0 | 🥭 🧊 🍋 | 45
Frozen mango blitzed with lime into an instant sorbet. Plant-based.
mango 600, lime 30, maple-syrup 30
- Freeze the cubed {mango} overnight.
- Blend with the {lime} and {maple-syrup} until smooth. Serve straight away.

# Chocolate peanut butter cups | American | 12 | 20 | 0 | Easy | 0 | 🍫 🥜 ✨ | 25
Homemade peanut butter cups with a pinch of sea salt.
dark-chocolate 200, peanut-butter 100, maple-syrup 15, salt 0.5
- Melt the {dark-chocolate}; spoon half into 12 mini cases and chill.
- Mix the {peanut-butter} and {maple-syrup}; add a spoonful to each.
- Cover with the rest of the chocolate, sprinkle with {salt} and chill until set.

# Baked rice pudding with jam | British | 4 | 5 | 90 | Easy | 0 | 🍚 🍓 🥛 | 40
Slow-baked creamy rice pudding with a spoon of jam.
white-rice 100, milk 900, sugar 50, butter 10, nutmeg 0.5, jam 60
- Heat the oven to 150°C.
- Stir the {white-rice}, {milk} and {sugar} in a buttered dish (use the {butter}); grate over the {nutmeg}.
- Bake for 1½ hours, stirring twice. Serve with {jam}.

# Lemon & blueberry yogurt loaf | Mediterranean | 10 | 15 | 50 | Easy | 0 | 🍋 🫐 🍰 | 230
A moist olive oil and yogurt loaf with blueberries.
flour 200, baking-powder 8, sugar 150, eggs 150, greek-yogurt 150, olive-oil 100, lemon-zest 6, blueberries 150
- Heat the oven to 180°C and line a loaf tin.
- Whisk the {eggs}, {sugar}, {greek-yogurt}, {olive-oil} and {lemon-zest}.
- Fold in the {flour}, {baking-powder} and {blueberries}; bake 50 minutes.

# Chocolate hazelnut fondue | French | 6 | 10 | 5 | Easy | 0 | 🍫 🍓 🍌 | 20
Warm chocolate sauce for dipping fruit, with toasted hazelnuts.
dark-chocolate 150, double-cream 100, hazelnuts 30, strawberries 300, banana 236, pineapple 200
- Warm the {double-cream}; stir in the chopped {dark-chocolate} until smooth.
- Sprinkle with chopped toasted {hazelnuts}.
- Serve with {strawberries}, sliced {banana} and {pineapple} for dipping.

# Banana & chocolate crêpes | French | 4 | 10 | 15 | Intermediate | 0 | 🥞 🍌 🍫 | 30
Thin crêpes filled with banana and melted chocolate.
flour 100, eggs 100, milk 250, butter 10, banana 236, dark-chocolate 60
- Whisk the {flour}, {eggs} and {milk}; rest 10 minutes.
- Cook 8 thin crêpes in a pan wiped with the {butter}.
- Fill with sliced {banana} and grated {dark-chocolate}; fold and serve warm.

# Churro-spiced popcorn | Mexican | 4 | 5 | 5 | Easy | 0 | 🍿 ✨ 🌰 | 30
Popcorn tossed in cinnamon sugar. A lighter sweet treat.
popcorn 60, coconut-oil 15, sugar 20, cinnamon 3
- Pop the {popcorn} in a lidded pan with half the {coconut-oil}.
- Toss with the rest of the oil, melted, then the {sugar} and {cinnamon}.

# Date & walnut squares | Middle Eastern | 10 | 15 | 0 | Easy | 0 | 🟤 🌰 🥥 | 30
No-bake squares of dates, walnuts, oats and cocoa. Plant-based.
dates 240, walnuts 100, cocoa 15, coconut 20, oats 60
- Blitz the stoned {dates}, {walnuts}, {oats} and {cocoa} to a sticky crumb.
- Press into a lined tin, sprinkle with {coconut} and chill. Cut into 10 squares.

# Tahini maple fudge | Middle Eastern | 12 | 10 | 0 | Easy | 0 | 🟫 🍯 ✨ | 40
Halva-inspired freezer fudge with sesame. Plant-based.
tahini 200, maple-syrup 60, coconut-oil 30, vanilla 3, sesame-seeds 10
- Melt the {coconut-oil}; whisk in the {tahini}, {maple-syrup} and {vanilla}.
- Pour into a small lined tin, sprinkle with {sesame-seeds} and freeze until firm. Cut into 12.

# Chocolate cornflour pudding | American | 4 | 5 | 10 | Easy | 0 | 🍫 🥄 🥛 | 20
A silky stovetop chocolate pudding, no eggs needed.
milk 600, cocoa 30, sugar 60, cornflour 35, vanilla 3, dark-chocolate 40
- Whisk the {cocoa}, {sugar} and {cornflour} with a little of the {milk}; add the rest.
- Stir over a medium heat until thick, then add the {dark-chocolate} and {vanilla}.
- Pour into four pots and chill.

# Coconut chia pudding with kiwi | Thai | 4 | 10 | 0 | Easy | 0 | 🥥 🥝 🥄 | 100
Creamy coconut chia pots topped with kiwi. Plant-based.
chia 60, coconut-milk 200, almond-milk 200, maple-syrup 30, kiwi 207, coconut 10
- Whisk the {chia}, {coconut-milk}, {almond-milk} and {maple-syrup}; chill overnight.
- Top with sliced {kiwi} and toasted {coconut}.

# Fruit & seed flapjacks | British | 12 | 10 | 25 | Easy | 0 | 🌾 🍇 🍯 | 35
Chewy oat flapjacks with raisins and pumpkin seeds.
oats 250, butter 125, brown-sugar 75, honey 75, raisins 60, pumpkin-seeds 30
- Heat the oven to 180°C and line a 20cm tin.
- Melt the {butter}, {brown-sugar} and {honey}; stir in the {oats}, {raisins} and {pumpkin-seeds}.
- Press into the tin and bake 22–25 minutes. Cool before cutting into 12.

# Grilled peaches with ricotta & honey | Italian | 4 | 5 | 6 | Easy | 0 | 🍑 🧀 🍯 | 25
Charred peach halves with sweet ricotta and almonds.
peach 600, ricotta 200, honey 25, almonds 20, mint 3
- Halve the {peach}es and griddle cut-side down for 3 minutes.
- Sweeten the {ricotta} with half the {honey}.
- Serve the peaches with the ricotta, the rest of the honey, toasted {almonds} and {mint}.

# Apple & berry crisp | American | 6 | 10 | 30 | Easy | 0 | 🍎 🫐 🌾 | 300
Apples and berries under a nutty oat crisp. Plant-based.
apple 540, frozen-berries 300, maple-syrup 30, oats 100, almonds 40, coconut-oil 50, brown-sugar 40, cinnamon 2
- Toss the sliced {apple} and {frozen-berries} with the {maple-syrup} in a dish.
- Mix the {oats}, chopped {almonds}, melted {coconut-oil}, {brown-sugar} and {cinnamon}; scatter over.
- Bake at 190°C for 30 minutes.

# Hot chocolate mug pudding | British | 1 | 3 | 2 | Easy | 0 | ☕ 🍫 🥛 | 15
A molten-middle chocolate pudding made in a mug in two minutes.
flour 25, cocoa 10, sugar 20, milk 45, olive-oil 15, dark-chocolate 15, ice-cream 50
- Mix the {flour}, {cocoa}, {sugar}, {milk} and {olive-oil} in a large mug.
- Push the {dark-chocolate} into the middle.
- Microwave for 60–70 seconds. Serve with {ice-cream}.

# Frozen yogurt-dipped strawberries | British | 4 | 15 | 0 | Easy | 0 | 🍓 🥛 🧊 | 345
Strawberries dipped in honeyed yogurt and frozen until crisp.
strawberries 300, greek-yogurt 200, honey 20, coconut 10
- Mix the {greek-yogurt} and {honey}.
- Dip the {strawberries}, sprinkle with {coconut} and freeze on a lined tray for 2 hours.
`)
