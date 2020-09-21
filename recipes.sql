--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.saved_recipes DROP CONSTRAINT saved_recipes_user_id_fkey;
ALTER TABLE ONLY public.saved_recipes DROP CONSTRAINT saved_recipes_recipe_id_fkey;
ALTER TABLE ONLY public.recipe_ingredients DROP CONSTRAINT recipe_ingredients_recipe_id_fkey;
ALTER TABLE ONLY public.instructions DROP CONSTRAINT instructions_recipe_id_fkey;
ALTER TABLE ONLY public.equipment DROP CONSTRAINT equipment_recipe_id_fkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.saved_recipes DROP CONSTRAINT saved_recipes_pkey;
ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipes_pkey;
ALTER TABLE ONLY public.recipe_ingredients DROP CONSTRAINT recipe_ingredients_pkey;
ALTER TABLE ONLY public.instructions DROP CONSTRAINT instructions_pkey;
ALTER TABLE ONLY public.equipment DROP CONSTRAINT equipment_pkey;
ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
ALTER TABLE public.saved_recipes ALTER COLUMN saved_id DROP DEFAULT;
ALTER TABLE public.recipes ALTER COLUMN recipe_id DROP DEFAULT;
ALTER TABLE public.recipe_ingredients ALTER COLUMN rec_ing_id DROP DEFAULT;
ALTER TABLE public.instructions ALTER COLUMN instruction_id DROP DEFAULT;
ALTER TABLE public.equipment ALTER COLUMN equipment_id DROP DEFAULT;
DROP SEQUENCE public.users_user_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.saved_recipes_saved_id_seq;
DROP TABLE public.saved_recipes;
DROP SEQUENCE public.recipes_recipe_id_seq;
DROP TABLE public.recipes;
DROP SEQUENCE public.recipe_ingredients_rec_ing_id_seq;
DROP TABLE public.recipe_ingredients;
DROP SEQUENCE public.instructions_instruction_id_seq;
DROP TABLE public.instructions;
DROP SEQUENCE public.equipment_equipment_id_seq;
DROP TABLE public.equipment;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: equipment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.equipment (
    equipment_id integer NOT NULL,
    recipe_id integer,
    equipment character varying
);


--
-- Name: equipment_equipment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.equipment_equipment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: equipment_equipment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.equipment_equipment_id_seq OWNED BY public.equipment.equipment_id;


--
-- Name: instructions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.instructions (
    instruction_id integer NOT NULL,
    recipe_id integer,
    step_num integer,
    step_instruction character varying
);


--
-- Name: instructions_instruction_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.instructions_instruction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: instructions_instruction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.instructions_instruction_id_seq OWNED BY public.instructions.instruction_id;


--
-- Name: recipe_ingredients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recipe_ingredients (
    rec_ing_id integer NOT NULL,
    recipe_id integer,
    ingredient_id integer,
    amount real,
    unit character varying,
    name character varying
);


--
-- Name: recipe_ingredients_rec_ing_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.recipe_ingredients_rec_ing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: recipe_ingredients_rec_ing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.recipe_ingredients_rec_ing_id_seq OWNED BY public.recipe_ingredients.rec_ing_id;


--
-- Name: recipes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recipes (
    recipe_id integer NOT NULL,
    title character varying,
    image character varying,
    servings integer,
    "sourceUrl" character varying,
    cooking_mins integer,
    prep_mins integer,
    ready_mins integer
);


--
-- Name: recipes_recipe_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.recipes_recipe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: recipes_recipe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.recipes_recipe_id_seq OWNED BY public.recipes.recipe_id;


--
-- Name: saved_recipes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.saved_recipes (
    saved_id integer NOT NULL,
    recipe_id integer,
    user_id integer,
    favorite boolean,
    tried boolean,
    rating integer,
    comment character varying
);


--
-- Name: saved_recipes_saved_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.saved_recipes_saved_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: saved_recipes_saved_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.saved_recipes_saved_id_seq OWNED BY public.saved_recipes.saved_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    phone character varying(12) NOT NULL
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: equipment equipment_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equipment ALTER COLUMN equipment_id SET DEFAULT nextval('public.equipment_equipment_id_seq'::regclass);


--
-- Name: instructions instruction_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.instructions ALTER COLUMN instruction_id SET DEFAULT nextval('public.instructions_instruction_id_seq'::regclass);


--
-- Name: recipe_ingredients rec_ing_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_ingredients ALTER COLUMN rec_ing_id SET DEFAULT nextval('public.recipe_ingredients_rec_ing_id_seq'::regclass);


--
-- Name: recipes recipe_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipes ALTER COLUMN recipe_id SET DEFAULT nextval('public.recipes_recipe_id_seq'::regclass);


--
-- Name: saved_recipes saved_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_recipes ALTER COLUMN saved_id SET DEFAULT nextval('public.saved_recipes_saved_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: equipment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.equipment (equipment_id, recipe_id, equipment) FROM stdin;
5	546249	bowl
6	546249	dutch oven
7	546249	frying pan
8	546249	ladle
9	546249	pot
10	546249	sauce pan
11	546249	whisk
12	546249	wooden spoon
1	\N	blender
15	177990	frying pan
17	1184395	bowl
18	1184395	frying pan
19	1184395	spatula
20	1184395	whisk
2	\N	canning jar
3	\N	knife
4	\N	sauce pan
22	541108	blender
23	541108	bowl
24	541108	food processor
14	\N	bowl
29	501117	baking sheet
30	501117	oven
31	501117	pastry cutter
33	730823	blender
34	386635	frying pan
35	386635	microwave
36	1156204	airfryer
37	1156204	kitchen thermometer
38	1156204	paper towels
39	1156204	spatula
43	33083	sauce pan
44	550659	baking paper
45	550659	baking sheet
46	550659	bowl
47	550659	broiler
48	550659	food processor
49	550659	oven
50	550659	pizza stone
51	550659	plastic wrap
52	550659	sauce pan
53	550659	tongs
13	\N	blender
40	\N	frying pan
41	\N	grill
42	\N	panini press
54	\N	frying pan
63	\N	frying pan
55	\N	aluminum foil
56	\N	bowl
57	\N	knife
58	\N	oven
59	\N	tongs
64	\N	frying pan
65	\N	grill
66	\N	grill pan
67	\N	kitchen thermometer
60	\N	baking pan
61	\N	frying pan
62	\N	oven
25	\N	bowl
26	\N	oven
27	\N	skewers
28	\N	whisk
21	\N	rolling pin
16	\N	microwave
75	540960	colander
76	540960	pot
32	\N	slow cooker
68	\N	bowl
69	\N	frying pan
70	\N	oven
71	\N	pizza pan
77	\N	frying pan
78	\N	bowl
79	\N	frying pan
80	\N	oven
81	\N	pizza pan
82	\N	bowl
83	\N	frying pan
84	\N	oven
85	\N	pizza pan
86	\N	bowl
87	\N	frying pan
88	\N	oven
89	\N	pizza pan
73	\N	blender
74	\N	ice cube tray
90	\N	bowl
91	\N	frying pan
92	\N	oven
93	\N	pizza pan
72	\N	blender
94	\N	bowl
95	\N	frying pan
96	\N	oven
97	\N	pizza pan
98	\N	bowl
99	\N	frying pan
100	\N	oven
101	\N	pizza pan
102	\N	bowl
103	\N	frying pan
104	\N	oven
105	\N	pizza pan
106	\N	bowl
107	\N	frying pan
108	\N	oven
109	\N	pizza pan
110	\N	bowl
111	\N	frying pan
112	\N	oven
113	\N	pizza pan
114	\N	bowl
115	\N	frying pan
116	\N	oven
117	\N	pizza pan
118	\N	bowl
119	\N	frying pan
120	\N	oven
121	\N	pizza pan
122	\N	bowl
123	\N	frying pan
124	\N	oven
125	\N	pizza pan
126	\N	bowl
127	\N	frying pan
128	\N	oven
129	\N	pizza pan
134	\N	bowl
135	\N	ladle
136	\N	pot
137	\N	sauce pan
138	\N	sieve
130	\N	bowl
131	\N	frying pan
132	\N	oven
133	\N	pizza pan
139	250114	bowl
140	250114	ladle
141	250114	pot
142	250114	sauce pan
143	250114	sieve
144	\N	bowl
145	\N	frying pan
146	\N	oven
147	\N	pizza pan
\.


--
-- Data for Name: instructions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.instructions (instruction_id, recipe_id, step_num, step_instruction) FROM stdin;
5	546249	1	Watch how to make this recipe.
6	546249	2	Season the beef generously with salt and pepper.
7	546249	3	Sprinkle 2 tablespoons of the flour evenly over the meat.
8	546249	4	Heat the olive oil in a large heavy saucepan or Dutch oven over medium-high heat.
9	546249	5	Add the beef in a single layer without crowding the pan (work in 2 batches if necessary) and cook, turning, until browned on all sides.
10	546249	6	Remove the beef from the pan and reserve.
11	546249	7	Add the beer to the pan and use a wooden spoon to scrape up any browned bits stuck to the bottom of the pan. Bring the liquid to a boil and cook until it is reduced by half; return the beef to the pot and add the potatoes, onions, carrots, celery stalk, broth and 1 cup water. Bring to a boil, reduce the heat to a very low simmer, cover and cook until the beef is very tender, 1 1/2 to 2 hours.
12	546249	8	In a small bowl, mash the butter with the remaining 3 tablespoons flour until smooth. While whisking the liquid, drop small pieces of the butter paste into the stew, whisking until each piece dissolves. Continue adding the butter paste until it is used up and completely dissolved into the stew.
13	546249	9	Add the peas and continue cooking until the stew is thickened and the peas are cooked, about 5 minutes. Taste and season with salt and pepper (about 1 1/2 teaspoons salt and 3/4 teaspoon pepper).
14	546249	10	Ladle the stew into individual bowls and garnish with the chopped celery leaves and sliced scallions, if using.
1	\N	1	Put all ingredients in a blender and blend till smooth.
2	\N	2	Pour into glasses and enjoy!
18	177990	1	In 12-inch skillet, heat milk, hot water, butter, uncooked pasta and sauce mix (from Tuna Helper box), carrots and tuna to boiling over high heat, stirring occasionally.
19	177990	2	Reduce heat; cover and simmer 5 minutes, stirring occasionally.
20	177990	3	Stir in peas and mushrooms. Cover; simmer about 5 minutes or until vegetables are tender.
21	177990	4	Remove from heat; let stand covered 5 minutes (sauce will thicken as it stands).
28	1184395	1	In a small bowl whisk eggs, milk and salt and pepper until just blended.
29	1184395	2	Heat a large nonstick skillet over medium-low heat until hot.
30	1184395	3	Add butter and let melt.
31	1184395	4	Pour egg mixture into skillet. As eggs begin to set, gently pull the eggs across the pan with a spatula forming large, soft curds.
32	1184395	5	Let the uncooked eggs flood the area you just pulled back. Low heat is the key here. You need to cook your eggs on a low heat so they are light and luffy instead of rubbery if cook them to quickly.
33	1184395	6	If you are adding cheese add it as the eggs start to form the large soft curds so it melts right into the eggs. Continue to pull the eggs across skillet, until thickened. They are done when no visible liquid egg mixture remains. DO NOT OVER COOK.
34	1184395	7	Serve immediately.
3	\N	1	Add the gooseberries, chopped apricots, ginger and lime juice to a heavy bottomed saucepan. Using a sharp paring knife, split the vanilla beans in half lengthwise and scrape the seeds with the tip of the knife.
4	\N	2	Add the seeds as well as the now empty pods to the saucepan. They add a lot of flavor and you can even leave them in the jars until the jam is all gone. Bring to a boil over medium-high heat. Reduce heat and continue cooking until the gooseberries start to pop and release their juice and seeds, about 5 minutes.   You want to keep about half the fruits whole, so make sure you don't overcook your jam.If you are planning on eating the whole batch within a week, just allow the jam to cool and keep refrigerated in an airtight container, for 8-10 days. However, if you want to keep it a little bit longer, transfer the jam while it's still hot into clean Mason jars and close the lids loosely. Allow to cool completely and transfer to the refrigerator. If a proper seal forms, you will be able to keep your jam for a couple of weeks in the refrigerator. Of course, if you know how ('cuz I don't), you could also can this the proper way and keep it on the shelf for several months... but if you're gonna do that, I think you should make a much bigger batch!
40	541108	1	Wash strawberries and prepare mixed green in a serving dish.Right before you serve salad, combine strawberries, olive oil, balsamic vinegar, and lemon juice in a blender or food processor and mix until smooth.
41	541108	2	Serve the dressing in a bowl or small pitcher and pour the dressing before you eat.
35	\N	1	Stack bologna slices alternately with Singles.
36	\N	2	Cut into 6 domino-sized rectangles.
37	\N	3	Dot with ketchup to resemble dominos.
17	\N	1	In a small bowl, mix tuna with onion, carrots, parsley, and lemon juice. Fill each egg with the tuna mixture and garnish with corn kernels.
48	501117	1	For the pastry, put the egg yolk, butter, sugar and  tsp salt in a processor and pulse until creamy and soft.
49	501117	2	Add the flour and pulse until the mix comes together in clumps, but dont overwork it. Tip onto the work surface and squish the dough together to make a smooth disc. Wrap and chill for 30 mins.
50	501117	3	For the filling, beat the butter, sugar, egg, extract and almonds together until creamy, then fold in the flour and a pinch of salt.
42	\N	1	Heat oven to 180C/160C fan/gas
43	\N	2	Butter and line a 20 x 30cm traybake tin with baking parchment.
38	\N	1	Flatten bread slices with a rolling pin.
39	\N	2	Spread a rounded tablespoonful of ham salad onto each slice of bread. Gently roll up; tie each with a chive.
22	\N	1	Mix ingredients until blended.
23	\N	2	Refrigerate 1 hour.
24	\N	1	Beat eggs and milk with fork in large microwaveable mug until blended.  Stir in bacon bits.
25	\N	2	Microwave on HIGH 1 min. 15 sec. to 1 min. 30 sec. or until  eggs are almost set.
26	\N	3	Top with cheese.
27	\N	4	Let stand 1 min.
51	501117	4	Line a large, flat baking sheet with parchment.
53	501117	6	Briefly beat the egg white with a fork until frothy.
55	501117	8	Sprinkle with the 25g sugar and chill while you heat oven to 190C/170C fan/gas
57	501117	10	Serve warm with cream or ice cream.
52	501117	5	Roll the pastry on a floured surface until just thicker than a 1 coin. Stamp 16 x 9cm circles using a pastry cutter, re-rolling the trimmings. Put 8 of the rounds on the sheet, allowing a little space between each one. Spoon 1 tbsp of the filling onto the middle of the rounds, flatten it out a little, then press in 6 gooseberries, pointy end up, in a flower shape.
54	501117	7	Brush some of this over the remaining circles, then sit them on top of the berries, like hats  the pastry on top will fold itself over the berries as it cooks.
56	501117	9	Bake the pies for 35 mins or until golden.
62	730823	1	Combine strawberries and lemonade in blender until smooth.
63	730823	2	Pour strawberry mixture into champagne flutes until half full. Fill glasses with Prosecco.
64	730823	3	Serve immediately, garnished with strawberry halves, if desired.
65	386635	1	Cook chicken nuggets according to package directions. Meanwhile, in a large skillet, cook stir-fry mix, covered, over medium heat for 6-8 minutes or until heated through. Stir in chicken nuggets.
66	386635	2	Microwave rice according to package directions.
67	386635	3	Serve with stir-fry mixture; sprinkle with cashews.
68	1156204	1	Remove chicken from packaging and pat dry with paper towels.
69	1156204	2	Remove and discard neck and giblets from cavity of chicken.
70	1156204	3	Loosen skin from the breast meat of the chicken by running a small spatula or your fingers gently underneath the skin.
71	1156204	4	Spread 2 tablespoons of softened butter underneath the skin on both breasts. Use your fingers to spread it around under the skin.
72	1156204	5	Liberally sprinkle the bbq seasoning over all sides of the chicken and rub into the skin so that it sticks.
73	1156204	6	Place the whole chicken breast-side down in the basket of your air fryer.
74	1156204	7	Set the air fryer to 350 degrees and cook the chicken for 30 minutes. After 30 minutes is up, pull out the basket and flip the chicken breast side up.
75	1156204	8	Place back in the air fryer at 350 degrees for 15-25 minutes, or until a meat thermometer reaches 165 degrees.
76	1156204	9	Allow chicken to rest for about 10 minutes before serving. Enjoy!
82	33083	1	Prepare Dinner in large saucepan as directed on package, adding beans to the boiling water the last 5 min.
83	33083	2	Stir in mushrooms.
84	33083	3	Spoon into serving dish; top with onions.
85	550659	1	Preheat oven to 300ºF, adjust rack to middle position, and place a pizza stone or pizza baking sheet in the oven (the stone/pan needs to preheat along with the oven).
86	550659	2	Place sunflower seeds in the bowl of a food processor. Process until finely ground.
87	550659	3	Add bell peppers, Italian seasoning, sea salt and cheese. Process until smooth.
88	550659	4	Place a small sheet of parchment paper on the counter.
89	550659	5	Place a 1/4 cup scoop of dough on the parchment.
90	550659	6	Spread dough into a 6" round.
91	550659	7	Bake on the preheated pizza stone for 20 minutes.Meanwhile, heat olive oil and garlic in a medium saucepan over medium heat. When garlic begins to sizzle, add tomatoes, salt and Italian seasoning (try to stand back a bit, as the sauce may splatter). Simmer on low for 10 minutes.
92	550659	8	Remove crust from the oven. Top with 2 tablespoons marinara and sprinkle with a few tablespoons of cheese and toppings of your choice.
93	550659	9	Bake for 10 minutes.
94	550659	10	Serve.Preheat the broiler.
95	550659	11	Place the whole peppers on a baking sheet and put under the broiler. Cook until the skins are just turning black. Using a pair of tongs, turn the peppers so the black skin is facing down. Repeat until all sides of the pepper are turning black.
96	550659	12	Place peppers in a deep bowl and cover the bowl tightly with plastic wrap.
97	550659	13	Let the peppers sit for 10 minutes (the steam will loosen the skins). When the peppers are cool enough to handle, peel the skin off and remove the seeds inside the pepper.I tested this recipe dozens of times and learned that the crust is very sensitive to heat. At first I thought a high heat would be the key, but the result was a burned exterior and mushy interior. The lower heat (300 degrees) proved to be just the right temperature. Hot enough to dry the crust out, but low enough not to burn. I learned that even a 10 degree difference will make a difference in the outcome of the crust (so make sure your oven is calibrated correctly). I used medium-size peppers and made sure to empty the juices and seeds out of them before adding them to the ground seeds. Too much moisture makes the crust mushy. Also, please use only a 1/4 cup for each pizza and make sure to spread them out to a 6-inch round. If the crust is too thick, it will be mushy.One fool-proof method for a crispy crust is to dehydrate the crust overnight. Make your 1/4 cup, 6-inch rounds on parchment and put them on a baking sheet (You could also spread all of the mixture out on a piece of parchment and place on a large baking sheet. Dehydrate overnight at 170 degrees F (about 8-10 hours).
98	\N	1	Heat a skillet over medium-high heat.
99	\N	2	Place the tortilla in the pan and cook for about 1 minute, until it begins to bubble.
100	\N	3	Flip the tortilla over and sprinkle cheese all over the top.
101	\N	4	Once the cheese begins to melt, top half of the tortilla with mushrooms, and fold in half.
102	\N	5	Cook for 2 minutes on each side, until the cheese is melted and everything is hot.
103	\N	6	Remove the quesadilla from the heat, open, and add your choice of stuffings.
58	\N	1	Clean and pat dry whole chicken. {remove the neck and innards inside the chicken}
59	\N	2	Place chicken, breast-side up in the crock pot.
60	\N	3	Pour one bottle of white wine and herb marinade over chicken. {I used Lawry's brand}Then place sprigs of fresh rosemary on top of chicken.Cover and cook on HIGH for 6 hours.
61	\N	4	Remove from crock pot and serve!
104	\N	1	Remove scallop meat from the shell, rinse the meat thoroughly and remove any dirty bits. Scald the scallop shells in a bowl of hot water for a few minutes to disinfect, discard hot water and rinse the shells. Return scallop meat to the shell.Make a slit on the mentaiko sac and scrap out the roe with a spoon or the back of a small knife. Discard the membrane.
106	\N	3	Place scallops on a foil-lined oven tray.
108	\N	5	Garnish each scallop with 1 to 2 stalks of hon-shimeji mushrooms.Return scallops to oven and continue baking for 10 minutes, or until the cheese is melted and the edges are slightly browned.
15	\N	1	Put all ingredients in a blender and blend till smooth.
16	\N	2	Pour into glasses and enjoy!
77	\N	1	Heat the panini maker. If you don't have a panini maker, you could use a pan with a little bit of butter and brown the sandwich on each side.
78	\N	2	Lay out 4 slices of the bread on your work surface. Divide the fajita mixture in 4 and top each slice with the chicken fajita mixture.
79	\N	3	Place a slice of cheese on top of the chicken fajitas then finally the other slice of bread.
80	\N	4	Place the sandwich in the panini maker and grill for about 3 or 4 minutes, or until cheese has melted and you have grill marks.
81	\N	5	Serve with salsa or sour cream if preferred.
116	\N	1	Place one tortilla in a dry pan over medium heat ( I use a cast iron skillet).
117	\N	2	Sprinkle 1/2 cup of cheese over tortilla and 1/2 cup of chopped chicken fajita mix.
118	\N	3	Top with another tortilla and heat through for 3 minutes on each side or until cheese is melted and tortilla is slightly toasted.
119	\N	4	Repeat for the second quesadilla.
120	\N	5	Cut into wedges and serve.
105	\N	2	Combine mentaiko roe with mayonnaise in a small bowl; stir to combine.
107	\N	4	Bake scallops in pre-heated oven of 200°C (392°F) for 5 minutes.Using tongs, carefully drain the scallop broth collected in the shells in a small bowl. You may use the broth for flavouring other dishes.Divide and scatter a layer of cheese on top of each scallops, followed by the mentaiko mixture.
121	\N	1	Pour out (or drink) half of beer.
122	\N	2	Prepare grill for high, indirect heat and fit with grill pan (for a charcoal grill, bank coals on 1 side of grill and put drip pan on empty side; for a gas grill, leave 1 burner turned off and place drip pan over unlit burner).
123	\N	3	Add water to pan to a depth of 1/2".
124	\N	4	Season chicken with 4-3-2-1 Spice Rub.
125	\N	5	Place cavity of chicken, legs pointing down, onto open can so that it supports chicken upright.
126	\N	6	Place can, with chicken, on grill over indirect heat (and above drip pan). Grill chicken, covered, until cooked through and an instant-read thermometer inserted into the thickest part of thigh registers 165°F, 45-60 minutes. (If using charcoal, you may need to add more to maintain heat.)
127	\N	7	Let chicken rest 10 minutes before carving.
128	\N	8	Serve with pan drippings.
109	\N	1	Preheat the oven to 425 degrees.
110	\N	2	Place all ingredients in a baking pan just large enough to fit all ingredients snugly in one layer.
111	\N	3	Mix thoroughly, making sure the turmeric is coating the chicken and mushrooms.
112	\N	4	Place the chicken in the pan breast side down, mushrooms all around.
113	\N	5	Bake uncovered 1 hour.Turn the chicken over and bake 15 minutes longer.
114	\N	6	Let the chicken rest just a few minutes before cutting.
115	\N	7	Serve hot with all accumulated liquids.
44	\N	3	Put the butter, caster sugar, flour, eggs and orange zest in a bowl. Beat thoroughly with an electric whisk until creamy and smooth. Stir in the gooseberries, then spoon into the tin and level the surface.
45	\N	4	Bake for 35 mins until a skewer inserted into the cake comes out clean.
46	\N	5	Stir the orange juice and granulated sugar together, spoon over the surface of the warm cake and leave to cool and set.
47	\N	6	Cut into squares.
139	540960	1	For dipping sauce, The dipping sauce is supposed to be a little salty because you will be "dipping" the soba noodles instead of soaking them to eat. You can always dilute it later if needed.For soba noodle, boil a lot of water in a large pot. Unlike pasta, you DO NOT add salt to the water.
140	540960	2	Add dried soba noodles in the boiling water in circulate motion, separating the noodles from each other. Boil soba noodles according to the package instructions (each one is slightly different). Mine says boil 4 minutes. Once in a while stir the noodles so they don’t stick to each other. Check the tenderness and do not overcook. I do not use "sashi mizu (adding water)" technique for this noodle as it's says so on the package.*
141	540960	3	Drain the noodles into a colander and wash the noodles in a cold running water to get rid of slimy texture. This is very important and key to great tasting noodle.Put chopped green onions and wasabi on a small plate.
142	540960	4	Serve soba noodles on a tray or dish.
143	540960	5	Sprinkle Kizami Nori on top right before you serve.
129	\N	1	Move oven rack to lowest position.
130	\N	2	Heat oven to 375° F. Spray 12-inch pizza pan with cooking spray.
132	\N	4	In large bowl, mix beef, salsa and beans; spoon mixture over dough to within 1 inch of edge. Top with tomato and green onions; sprinkle with cheese.
144	\N	1	Place one tortilla in a dry pan over medium heat ( I use a cast iron skillet).
145	\N	2	Sprinkle 1/2 cup of cheese over tortilla and 1/2 cup of chopped chicken fajita mix.
146	\N	3	Top with another tortilla and heat through for 3 minutes on each side or until cheese is melted and tortilla is slightly toasted.
147	\N	4	Repeat for the second quesadilla.
148	\N	5	Cut into wedges and serve.
149	\N	1	Move oven rack to lowest position.
153	\N	5	Bake 28 to 30 minutes or until crust is golden brown and cheese is melted.
136	\N	1	Pour half the bottle of rose into a ice cube tray.
137	\N	2	Place in the freezer and freeze overnight.When ready to assemble the frose, remove the rose cubes from the tray and place them in a blender. Top with the frozen fruit and remaining bottle of rose and blend on high until smooth.
138	\N	3	Pour into glasses and enjoy!
134	\N	1	Place frozen peaches and wine in a blender and blend until smooth.
135	\N	2	If you want the mixture to be a little more frozen, place mixture in the freezer for 30 minutes beofre serving.
131	\N	3	In medium bowl, stir Bisquick mix, cheeese sauce and hot water until soft dough forms. On surface sprinkled with Bisquick mix, gently roll dough in Bisquick mix to coat. Shape into a ball; knead 5 times or until smooth. Press dough into pan, using fingers dipped in Bisquick mix.
133	\N	5	Bake 28 to 30 minutes or until crust is golden brown and cheese is melted.
150	\N	2	Heat oven to 375° F. Spray 12-inch pizza pan with cooking spray.
151	\N	3	In medium bowl, stir Bisquick mix, cheeese sauce and hot water until soft dough forms. On surface sprinkled with Bisquick mix, gently roll dough in Bisquick mix to coat. Shape into a ball; knead 5 times or until smooth. Press dough into pan, using fingers dipped in Bisquick mix.
152	\N	4	In large bowl, mix beef, salsa and beans; spoon mixture over dough to within 1 inch of edge. Top with tomato and green onions; sprinkle with cheese.
154	\N	1	Move oven rack to lowest position.
155	\N	2	Heat oven to 375° F. Spray 12-inch pizza pan with cooking spray.
156	\N	3	In medium bowl, stir Bisquick mix, cheeese sauce and hot water until soft dough forms. On surface sprinkled with Bisquick mix, gently roll dough in Bisquick mix to coat. Shape into a ball; knead 5 times or until smooth. Press dough into pan, using fingers dipped in Bisquick mix.
157	\N	4	In large bowl, mix beef, salsa and beans; spoon mixture over dough to within 1 inch of edge. Top with tomato and green onions; sprinkle with cheese.
158	\N	5	Bake 28 to 30 minutes or until crust is golden brown and cheese is melted.
159	\N	1	Move oven rack to lowest position.
160	\N	2	Heat oven to 375° F. Spray 12-inch pizza pan with cooking spray.
161	\N	3	In medium bowl, stir Bisquick mix, cheeese sauce and hot water until soft dough forms. On surface sprinkled with Bisquick mix, gently roll dough in Bisquick mix to coat. Shape into a ball; knead 5 times or until smooth. Press dough into pan, using fingers dipped in Bisquick mix.
162	\N	4	In large bowl, mix beef, salsa and beans; spoon mixture over dough to within 1 inch of edge. Top with tomato and green onions; sprinkle with cheese.
163	\N	5	Bake 28 to 30 minutes or until crust is golden brown and cheese is melted.
164	\N	1	Move oven rack to lowest position.
165	\N	2	Heat oven to 375° F. Spray 12-inch pizza pan with cooking spray.
166	\N	3	In medium bowl, stir Bisquick mix, cheeese sauce and hot water until soft dough forms. On surface sprinkled with Bisquick mix, gently roll dough in Bisquick mix to coat. Shape into a ball; knead 5 times or until smooth. Press dough into pan, using fingers dipped in Bisquick mix.
167	\N	4	In large bowl, mix beef, salsa and beans; spoon mixture over dough to within 1 inch of edge. Top with tomato and green onions; sprinkle with cheese.
168	\N	5	Bake 28 to 30 minutes or until crust is golden brown and cheese is melted.
169	\N	1	Move oven rack to lowest position.
170	\N	2	Heat oven to 375° F. Spray 12-inch pizza pan with cooking spray.
171	\N	3	In medium bowl, stir Bisquick mix, cheeese sauce and hot water until soft dough forms. On surface sprinkled with Bisquick mix, gently roll dough in Bisquick mix to coat. Shape into a ball; knead 5 times or until smooth. Press dough into pan, using fingers dipped in Bisquick mix.
172	\N	4	In large bowl, mix beef, salsa and beans; spoon mixture over dough to within 1 inch of edge. Top with tomato and green onions; sprinkle with cheese.
173	\N	5	Bake 28 to 30 minutes or until crust is golden brown and cheese is melted.
174	\N	1	Move oven rack to lowest position.
175	\N	2	Heat oven to 375° F. Spray 12-inch pizza pan with cooking spray.
176	\N	3	In medium bowl, stir Bisquick mix, cheeese sauce and hot water until soft dough forms. On surface sprinkled with Bisquick mix, gently roll dough in Bisquick mix to coat. Shape into a ball; knead 5 times or until smooth. Press dough into pan, using fingers dipped in Bisquick mix.
177	\N	4	In large bowl, mix beef, salsa and beans; spoon mixture over dough to within 1 inch of edge. Top with tomato and green onions; sprinkle with cheese.
178	\N	5	Bake 28 to 30 minutes or until crust is golden brown and cheese is melted.
179	\N	1	Move oven rack to lowest position.
180	\N	2	Heat oven to 375° F. Spray 12-inch pizza pan with cooking spray.
181	\N	3	In medium bowl, stir Bisquick mix, cheeese sauce and hot water until soft dough forms. On surface sprinkled with Bisquick mix, gently roll dough in Bisquick mix to coat. Shape into a ball; knead 5 times or until smooth. Press dough into pan, using fingers dipped in Bisquick mix.
182	\N	4	In large bowl, mix beef, salsa and beans; spoon mixture over dough to within 1 inch of edge. Top with tomato and green onions; sprinkle with cheese.
183	\N	5	Bake 28 to 30 minutes or until crust is golden brown and cheese is melted.
184	\N	1	Move oven rack to lowest position.
185	\N	2	Heat oven to 375° F. Spray 12-inch pizza pan with cooking spray.
186	\N	3	In medium bowl, stir Bisquick mix, cheeese sauce and hot water until soft dough forms. On surface sprinkled with Bisquick mix, gently roll dough in Bisquick mix to coat. Shape into a ball; knead 5 times or until smooth. Press dough into pan, using fingers dipped in Bisquick mix.
187	\N	4	In large bowl, mix beef, salsa and beans; spoon mixture over dough to within 1 inch of edge. Top with tomato and green onions; sprinkle with cheese.
188	\N	5	Bake 28 to 30 minutes or until crust is golden brown and cheese is melted.
189	\N	1	Move oven rack to lowest position.
190	\N	2	Heat oven to 375° F. Spray 12-inch pizza pan with cooking spray.
192	\N	4	In large bowl, mix beef, salsa and beans; spoon mixture over dough to within 1 inch of edge. Top with tomato and green onions; sprinkle with cheese.
191	\N	3	In medium bowl, stir Bisquick mix, cheeese sauce and hot water until soft dough forms. On surface sprinkled with Bisquick mix, gently roll dough in Bisquick mix to coat. Shape into a ball; knead 5 times or until smooth. Press dough into pan, using fingers dipped in Bisquick mix.
193	\N	5	Bake 28 to 30 minutes or until crust is golden brown and cheese is melted.
194	\N	1	Move oven rack to lowest position.
195	\N	2	Heat oven to 375° F. Spray 12-inch pizza pan with cooking spray.
196	\N	3	In medium bowl, stir Bisquick mix, cheeese sauce and hot water until soft dough forms. On surface sprinkled with Bisquick mix, gently roll dough in Bisquick mix to coat. Shape into a ball; knead 5 times or until smooth. Press dough into pan, using fingers dipped in Bisquick mix.
197	\N	4	In large bowl, mix beef, salsa and beans; spoon mixture over dough to within 1 inch of edge. Top with tomato and green onions; sprinkle with cheese.
198	\N	5	Bake 28 to 30 minutes or until crust is golden brown and cheese is melted.
199	\N	1	Move oven rack to lowest position.
200	\N	2	Heat oven to 375° F. Spray 12-inch pizza pan with cooking spray.
201	\N	3	In medium bowl, stir Bisquick mix, cheeese sauce and hot water until soft dough forms. On surface sprinkled with Bisquick mix, gently roll dough in Bisquick mix to coat. Shape into a ball; knead 5 times or until smooth. Press dough into pan, using fingers dipped in Bisquick mix.
202	\N	4	In large bowl, mix beef, salsa and beans; spoon mixture over dough to within 1 inch of edge. Top with tomato and green onions; sprinkle with cheese.
203	\N	5	Bake 28 to 30 minutes or until crust is golden brown and cheese is melted.
204	\N	1	Move oven rack to lowest position.
205	\N	2	Heat oven to 375° F. Spray 12-inch pizza pan with cooking spray.
206	\N	3	In medium bowl, stir Bisquick mix, cheeese sauce and hot water until soft dough forms. On surface sprinkled with Bisquick mix, gently roll dough in Bisquick mix to coat. Shape into a ball; knead 5 times or until smooth. Press dough into pan, using fingers dipped in Bisquick mix.
207	\N	4	In large bowl, mix beef, salsa and beans; spoon mixture over dough to within 1 inch of edge. Top with tomato and green onions; sprinkle with cheese.
208	\N	5	Bake 28 to 30 minutes or until crust is golden brown and cheese is melted.
209	\N	1	Move oven rack to lowest position.
210	\N	2	Heat oven to 375° F. Spray 12-inch pizza pan with cooking spray.
211	\N	3	In medium bowl, stir Bisquick mix, cheeese sauce and hot water until soft dough forms. On surface sprinkled with Bisquick mix, gently roll dough in Bisquick mix to coat. Shape into a ball; knead 5 times or until smooth. Press dough into pan, using fingers dipped in Bisquick mix.
212	\N	4	In large bowl, mix beef, salsa and beans; spoon mixture over dough to within 1 inch of edge. Top with tomato and green onions; sprinkle with cheese.
213	\N	5	Bake 28 to 30 minutes or until crust is golden brown and cheese is melted.
219	\N	1	Heat a large pot of water to 16
220	\N	2	Gently lower eggs into water and simmer 30 minutes, keeping water temperature between 152 and 156 (add a tablespoon of ice water to control the heat's rise). Chill eggs in cold water, then carefully crack into a small, shallow dish. Or soft-cook eggs the way you like.
221	\N	3	Boil udon (see "Udon Essentials," below). Using a large strainer, scoop out noodles into a large bowl and save water to heat soup bowls.
222	\N	4	Meanwhile, put green onions in a bowl of cold water and vigorously swish around with your fingers to separate into rings.
223	\N	5	Drain; repeat twice.
224	\N	6	Bring broth to a boil in a saucepan.
225	\N	7	Warm 4 soup bowls by dipping them in hot udon-cooking water. Divide noodles among bowls. Scoop an egg into each, leaving behind most of white, and ladle broth over noodles. Top with green onions and a pinch of seven-spice powder.
226	\N	8	Udon Essentials Udon (wheat-flour noodles): Store-bought fresh-frozen noodles have a supple texture that's closest to homemade, while the dried ones tend to be thin and flabby. To cook store-bought fresh-frozen udon, drop the frozen block into boiling water. When the water boils again, drain. Cook udon right before serving; the noodles get sticky as they sit.
227	\N	9	Make ahead: Eggs in shell, up to 2 days, chilled. Green onions, up to 1 day, chilled.
214	\N	1	Move oven rack to lowest position.
215	\N	2	Heat oven to 375° F. Spray 12-inch pizza pan with cooking spray.
216	\N	3	In medium bowl, stir Bisquick mix, cheeese sauce and hot water until soft dough forms. On surface sprinkled with Bisquick mix, gently roll dough in Bisquick mix to coat. Shape into a ball; knead 5 times or until smooth. Press dough into pan, using fingers dipped in Bisquick mix.
217	\N	4	In large bowl, mix beef, salsa and beans; spoon mixture over dough to within 1 inch of edge. Top with tomato and green onions; sprinkle with cheese.
218	\N	5	Bake 28 to 30 minutes or until crust is golden brown and cheese is melted.
228	250114	1	Heat a large pot of water to 16
229	250114	2	Gently lower eggs into water and simmer 30 minutes, keeping water temperature between 152 and 156 (add a tablespoon of ice water to control the heat's rise). Chill eggs in cold water, then carefully crack into a small, shallow dish. Or soft-cook eggs the way you like.
230	250114	3	Boil udon (see "Udon Essentials," below). Using a large strainer, scoop out noodles into a large bowl and save water to heat soup bowls.
231	250114	4	Meanwhile, put green onions in a bowl of cold water and vigorously swish around with your fingers to separate into rings.
232	250114	5	Drain; repeat twice.
233	250114	6	Bring broth to a boil in a saucepan.
234	250114	7	Warm 4 soup bowls by dipping them in hot udon-cooking water. Divide noodles among bowls. Scoop an egg into each, leaving behind most of white, and ladle broth over noodles. Top with green onions and a pinch of seven-spice powder.
236	250114	9	Make ahead: Eggs in shell, up to 2 days, chilled. Green onions, up to 1 day, chilled.
235	250114	8	Udon Essentials Udon (wheat-flour noodles): Store-bought fresh-frozen noodles have a supple texture that's closest to homemade, while the dried ones tend to be thin and flabby. To cook store-bought fresh-frozen udon, drop the frozen block into boiling water. When the water boils again, drain. Cook udon right before serving; the noodles get sticky as they sit.
237	\N	1	Move oven rack to lowest position.
238	\N	2	Heat oven to 375° F. Spray 12-inch pizza pan with cooking spray.
239	\N	3	In medium bowl, stir Bisquick mix, cheeese sauce and hot water until soft dough forms. On surface sprinkled with Bisquick mix, gently roll dough in Bisquick mix to coat. Shape into a ball; knead 5 times or until smooth. Press dough into pan, using fingers dipped in Bisquick mix.
240	\N	4	In large bowl, mix beef, salsa and beans; spoon mixture over dough to within 1 inch of edge. Top with tomato and green onions; sprinkle with cheese.
241	\N	5	Bake 28 to 30 minutes or until crust is golden brown and cheese is melted.
\.


--
-- Data for Name: recipe_ingredients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recipe_ingredients (rec_ing_id, recipe_id, ingredient_id, amount, unit, name) FROM stdin;
11	546249	23572	2	lb	beef
12	546249	11124	4	large	carrots
13	546249	10111143	1		celery stalk
14	546249	20081	5	Tbsps	flour
15	546249	1082047	6	servings	kosher salt
16	546249	10093741	4	cups	low sodium beef broth
17	546249	11352	10	small	new potatoes
18	546249	4053	3	Tbsps	olive oil
19	546249	11304	1	cup	peas
20	546249	11291	3		scallions
21	546249	93619	12	oz	stout beer
22	546249	1145	3	Tbsps	unsalted butter
23	546249	10511282	2	medium	yellow onions
1	\N	9040	0.5		banana
2	\N	9050	0.5	cups	blueberries
3	\N	9107	0.5	cups	gooseberries
4	\N	1082	0.5	cups	lowfat milk
5	\N	43261	0.5	cups	nonfat vanilla yogurt
42	177990	1001	3	Tbsps	butter
43	177990	10115121	10	oz	canned tuna
44	177990	11124	2	medium	carrots
45	177990	1077	1.75	cups	milk
46	177990	11260	4.5	oz	mushrooms
47	177990	11304	1	cup	peas
48	177990	10015121	1	box	tuna
49	177990	14412	1.5	cups	water
57	1184395	1123	4	large	eggs
58	1184395	1077	1	Tbsp	milk
59	1184395	1041009	1	serving	cheese
60	1184395	1102047	1	serving	Salt & Pepper
61	1184395	1001	2	tsps	butter
6	\N	9032	125	oz	dried apricots
7	\N	11216	15	oz	fresh ginger
8	\N	9107	750	lb	gooseberries
9	\N	9160	1		juice of lime
10	\N	93622	2		vanilla beans
29	\N	1041009	1	cup	cheese
30	\N	4047	0.670000017	cups	coconut oil
31	\N	1123	2		eggs
32	\N	1077	1.33000004	cups	milk
33	\N	2047	1	tsp	salt
34	\N	93696	14	oz	tapioca starch
68	541108	2069	1	tsp	balsamic vinegar
69	541108	9152	1	Tbsp	lemon juice
70	541108	9316	5.5	oz	strawberries
62	\N	23572	2	slice	beef
63	\N	1190	2		kraft singles
64	\N	11935	2	Tbsps	tomato ketchup
35	\N	1123	6		eggs
36	\N	10015121	1		tuna
37	\N	11282	0.5	small	onion
38	\N	11124	0.25	cups	carrot
39	\N	11297	0.330000013	cups	parsley
40	\N	9152	1	Tbsp	lemon juice
41	\N	11168	1	serving	corn
78	501117	19095	1	serving	ice cream
79	501117	1123	1	large	egg
80	501117	1145	225	oz	unsalted butter
81	501117	19335	50	oz	sugar
82	501117	20081	350	oz	plain flour
83	501117	1145	50	oz	unsalted butter
84	501117	19335	50	oz	sugar
85	501117	1123	1	large	egg
86	501117	1002050	1	tsp	almond extract
87	501117	93740	50	oz	ground almond
88	501117	20081	1	Tbsp	plain flour
89	501117	9107	300	oz	gooseberry
93	730823	99184	1	cup	lemonade
94	730823	9316	3	cups	strawberries
95	730823	9316	4		strawberries
96	730823	\N	750	mL	prosecco
97	386635	20040	8.80000019	oz	brown rice
98	386635	5006	13.1999998	oz	chicken
99	386635	12585	3	Tbsps	salted cashews
100	386635	\N	21	oz	sweet-and-sour stir-fry mix
101	1156204	1001	2	Tbsps	butter
102	1156204	5006	1		chicken
103	1156204	1012034	2	Tbsps	rub
107	33083	93709	0.670000017	cups	fried onions
108	33083	11052	2	cups	green beans
109	33083	11260	4	oz	mushrooms
110	33083	1192	12	oz	velveeta cheese
111	550659	1022027	0.5	tsps	italian seasoning
112	550659	11260	6	servings	mushrooms
113	550659	1038	1	cup	pecorino romano cheese
24	\N	9040	0.5		banana
104	\N	18064	8	slice	bread
105	\N	5006	4	servings	chicken
106	\N	93838	4		havarti cheese
114	\N	1041009	0.5	cups	cheese
115	\N	11260	0.5	cups	mushrooms
116	\N	18364	2		tortillas
124	\N	1041009	1	cup	cheese
125	\N	5006	1	cup	chicken
126	\N	18364	4		tortillas
117	\N	4025	1	Tbsp	mayonnaise
118	\N	11260	3	stalks	mushrooms
119	\N	10015172	5		scallops
120	\N	1001026	40	oz	shredded mozzarella cheese
127	\N	5006	3.5	lb	chicken
128	\N	10114003	1	can	lager
129	\N	1012034	2	Tbsps	Spice Rub
121	\N	11265	1.5	lb	portobello mushrooms
122	\N	2043	2	tsps	turmeric
123	\N	5006	1		whole chicken
71	\N	1001	225	oz	butter
72	\N	19335	225	oz	sugar
73	\N	20129	225	oz	self-raising flour
74	\N	1123	4	large	eggs
75	\N	9216	1		orange zest
65	\N	5006	2	cups	chicken
66	\N	11291	22	servings	green onion tops
67	\N	18069	16	oz	white sandwich bread
50	\N	9156	0.25	tsps	lemon zest
51	\N	9316	8	oz	strawberry
52	\N	9316	0.5	cups	strawberries
53	\N	1041009	1	Tbsp	cheese
54	\N	1123	2		eggs
55	\N	1077	2	Tbsps	milk
56	\N	99229	1	Tbsp	real bacon bits
90	\N	2063	3	sprigs	fresh rosemary
91	\N	5006	5	lb	whole chicken
92	\N	14084	12	oz	wine
25	\N	9050	0.5	cups	blueberries
26	\N	9107	0.5	cups	gooseberries
27	\N	1082	0.5	cups	lowfat milk
28	\N	43261	0.5	cups	nonfat vanilla yogurt
76	\N	9107	225	oz	gooseberry
77	\N	19335	140	oz	granulated sugar
145	540960	1006963	4	servings	dashi
146	540960	11291	2		green onions
147	540960	20420	14	oz	noodle
148	540960	11446	4	servings	nori
149	540960	10011990	4	servings	wasabi paste
150	540960	\N	4	servings	mentsuyu
130	\N	23572	1	cup	beef
131	\N	16018	15	oz	canned black beans
132	\N	11291	0.25	cups	green onions
133	\N	98901	0.25	cups	nacho cheese sauce
134	\N	1025	1	cup	pepper jack cheese
135	\N	6164	16	oz	salsa
136	\N	11529	1	cup	tomato
137	\N	14412	0.25	cups	water
138	\N	\N	2	cups	mix
151	\N	1041009	1	cup	cheese
152	\N	5006	1	cup	chicken
153	\N	18364	4		tortillas
154	\N	23572	1	cup	beef
155	\N	16018	15	oz	canned black beans
156	\N	11291	0.25	cups	green onions
157	\N	98901	0.25	cups	nacho cheese sauce
158	\N	1025	1	cup	pepper jack cheese
159	\N	6164	16	oz	salsa
160	\N	11529	1	cup	tomato
161	\N	14412	0.25	cups	water
162	\N	\N	2	cups	mix
163	\N	23572	1	cup	beef
164	\N	16018	15	oz	canned black beans
165	\N	11291	0.25	cups	green onions
166	\N	98901	0.25	cups	nacho cheese sauce
167	\N	1025	1	cup	pepper jack cheese
168	\N	6164	16	oz	salsa
169	\N	11529	1	cup	tomato
170	\N	14412	0.25	cups	water
171	\N	\N	2	cups	mix
172	\N	23572	1	cup	beef
173	\N	16018	15	oz	canned black beans
174	\N	11291	0.25	cups	green onions
175	\N	98901	0.25	cups	nacho cheese sauce
176	\N	1025	1	cup	pepper jack cheese
177	\N	6164	16	oz	salsa
178	\N	11529	1	cup	tomato
179	\N	14412	0.25	cups	water
180	\N	\N	2	cups	mix
142	\N	9176	2	cups	mango
143	\N	9236	2	cups	peaches
144	\N	14084	1	bottle	wine
181	\N	23572	1	cup	beef
182	\N	16018	15	oz	canned black beans
183	\N	11291	0.25	cups	green onions
184	\N	98901	0.25	cups	nacho cheese sauce
185	\N	1025	1	cup	pepper jack cheese
186	\N	6164	16	oz	salsa
187	\N	11529	1	cup	tomato
188	\N	14412	0.25	cups	water
189	\N	\N	2	cups	mix
139	\N	9236	4		peaches
140	\N	14113	1	bottle	pinot grigio
141	\N	2064	1	slice	mint
190	\N	23572	1	cup	beef
191	\N	16018	15	oz	canned black beans
192	\N	11291	0.25	cups	green onions
193	\N	98901	0.25	cups	nacho cheese sauce
194	\N	1025	1	cup	pepper jack cheese
195	\N	6164	16	oz	salsa
196	\N	11529	1	cup	tomato
197	\N	14412	0.25	cups	water
198	\N	\N	2	cups	mix
199	\N	23572	1	cup	beef
200	\N	16018	15	oz	canned black beans
201	\N	11291	0.25	cups	green onions
202	\N	98901	0.25	cups	nacho cheese sauce
203	\N	1025	1	cup	pepper jack cheese
204	\N	6164	16	oz	salsa
205	\N	11529	1	cup	tomato
206	\N	14412	0.25	cups	water
207	\N	\N	2	cups	mix
208	\N	23572	1	cup	beef
209	\N	16018	15	oz	canned black beans
210	\N	11291	0.25	cups	green onions
211	\N	98901	0.25	cups	nacho cheese sauce
212	\N	1025	1	cup	pepper jack cheese
213	\N	6164	16	oz	salsa
214	\N	11529	1	cup	tomato
215	\N	14412	0.25	cups	water
216	\N	\N	2	cups	mix
217	\N	23572	1	cup	beef
218	\N	16018	15	oz	canned black beans
219	\N	11291	0.25	cups	green onions
220	\N	98901	0.25	cups	nacho cheese sauce
221	\N	1025	1	cup	pepper jack cheese
222	\N	6164	16	oz	salsa
223	\N	11529	1	cup	tomato
224	\N	14412	0.25	cups	water
225	\N	\N	2	cups	mix
226	\N	23572	1	cup	beef
227	\N	16018	15	oz	canned black beans
228	\N	11291	0.25	cups	green onions
229	\N	98901	0.25	cups	nacho cheese sauce
230	\N	1025	1	cup	pepper jack cheese
231	\N	6164	16	oz	salsa
232	\N	11529	1	cup	tomato
233	\N	14412	0.25	cups	water
234	\N	\N	2	cups	mix
235	\N	23572	1	cup	beef
236	\N	16018	15	oz	canned black beans
237	\N	11291	0.25	cups	green onions
238	\N	98901	0.25	cups	nacho cheese sauce
239	\N	1025	1	cup	pepper jack cheese
240	\N	6164	16	oz	salsa
241	\N	11529	1	cup	tomato
242	\N	14412	0.25	cups	water
243	\N	\N	2	cups	mix
244	\N	23572	1	cup	beef
245	\N	16018	15	oz	canned black beans
246	\N	11291	0.25	cups	green onions
247	\N	98901	0.25	cups	nacho cheese sauce
248	\N	1025	1	cup	pepper jack cheese
249	\N	6164	16	oz	salsa
250	\N	11529	1	cup	tomato
251	\N	14412	0.25	cups	water
252	\N	\N	2	cups	mix
253	\N	23572	1	cup	beef
254	\N	16018	15	oz	canned black beans
255	\N	11291	0.25	cups	green onions
256	\N	98901	0.25	cups	nacho cheese sauce
257	\N	1025	1	cup	pepper jack cheese
258	\N	6164	16	oz	salsa
259	\N	11529	1	cup	tomato
260	\N	14412	0.25	cups	water
261	\N	\N	2	cups	mix
262	\N	23572	1	cup	beef
263	\N	16018	15	oz	canned black beans
264	\N	11291	0.25	cups	green onions
265	\N	98901	0.25	cups	nacho cheese sauce
266	\N	1025	1	cup	pepper jack cheese
267	\N	6164	16	oz	salsa
268	\N	11529	1	cup	tomato
269	\N	14412	0.25	cups	water
270	\N	\N	2	cups	mix
280	\N	1002002	0.25	tsps	5 spice powder
281	\N	1006615	3	cups	broth
282	\N	1123	4	large	eggs
283	\N	11291	0.25	cups	green onions
284	\N	98966	0.75	lb	udon noodles
271	\N	23572	1	cup	beef
272	\N	16018	15	oz	canned black beans
273	\N	11291	0.25	cups	green onions
274	\N	98901	0.25	cups	nacho cheese sauce
275	\N	1025	1	cup	pepper jack cheese
276	\N	6164	16	oz	salsa
277	\N	11529	1	cup	tomato
278	\N	14412	0.25	cups	water
279	\N	\N	2	cups	mix
285	250114	1002002	0.25	tsps	5 spice powder
286	250114	1006615	3	cups	broth
287	250114	1123	4	large	eggs
288	250114	11291	0.25	cups	green onions
289	250114	98966	0.75	lb	udon noodles
290	\N	23572	1	cup	beef
291	\N	16018	15	oz	canned black beans
292	\N	11291	0.25	cups	green onions
293	\N	98901	0.25	cups	nacho cheese sauce
294	\N	1025	1	cup	pepper jack cheese
295	\N	6164	16	oz	salsa
296	\N	11529	1	cup	tomato
297	\N	14412	0.25	cups	water
298	\N	\N	2	cups	mix
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recipes (recipe_id, title, image, servings, "sourceUrl", cooking_mins, prep_mins, ready_mins) FROM stdin;
546249	Beef Stew	https://spoonacular.com/recipeImages/546249-312x231.jpeg	6	http://www.foodnetwork.com/recipes/katie-lee/beef-stew.html	120	50	170
177990	Creamy Tuna Primavera	https://spoonacular.com/recipeImages/177990-312x231.jpg	5	http://www.bettycrocker.com/recipes/creamy-tuna-primavera/50553d96-c2a3-43e0-a189-aebcf1aab0e1	5	15	20
1184395	The BEST Scrambled Eggs	https://spoonacular.com/recipeImages/1184395-312x231.jpg	2	https://www.julieseatsandtreats.com/the-best-scrambled-eggs/	10	5	15
541108	Strawberry Dressing	https://spoonacular.com/recipeImages/541108-312x231.jpg	4	http://www.justonecookbook.com/recipes/strawberry-dressing/	0	10	10
501117	Gooseberry Bakewell pies	https://spoonacular.com/recipeImages/501117-312x231.jpg	8	https://www.bbcgoodfood.com/recipes/goose-bump-bakewell-pies	20	30	50
730823	Strawberry Lemonade Bellini	https://spoonacular.com/recipeImages/730823-312x231.jpg	8	http://damndelicious.net/2016/04/10/strawberry-lemonade-bellini/	0	5	5
386635	Quick Sweet-and-Sour Chicken	https://spoonacular.com/recipeImages/386635-312x231.jpg	3	http://www.tasteofhome.com/Recipes/quick-sweet-and-sour-chicken	20	5	25
1156204	Air Fryer Whole Chicken	https://spoonacular.com/recipeImages/1156204-312x231.jpg	6	https://belleofthekitchen.com/air-fryer-whole-chicken/	60	5	65
33083	Cheesy Shells and Green Beans	https://spoonacular.com/recipeImages/33083-312x231.jpg	4	http://www.kraftrecipes.com/recipes/cheesy-shells-green-beans-50210.aspx	0	20	20
550659	Pizza (Grain Free, Paleo, Primal, GAPS)	https://spoonacular.com/recipeImages/550659-312x231.jpg	6	http://deliciouslyorganic.net/pizza-grain-free-paleo-primal-gaps-recipe/	0	0	45
540960	Zaru Soba (Cold Soba Noodles)	https://spoonacular.com/recipeImages/540960-312x231.jpg	4	http://www.justonecookbook.com/recipes/zaru-soba-cold-soba-noodles/	10	5	15
250114	Udon with Soft Egg and Green Onion (Onsen Tamago Udon)	https://spoonacular.com/recipeImages/250114-312x231.jpg	4	http://www.myrecipes.com/recipe/udon-soft-egg-onion-50400000133198/	0	0	40
\.


--
-- Data for Name: saved_recipes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.saved_recipes (saved_id, recipe_id, user_id, favorite, tried, rating, comment) FROM stdin;
46	\N	4	t	\N	\N	\N
32	540960	4	t	\N	\N	\N
51	546249	5	f	\N	\N	\N
16	\N	1	t	\N	\N	\N
28	\N	1	f	\N	\N	\N
53	250114	5	t	\N	\N	\N
29	546249	4	t	t	3	Yummy, warm, deliciousness!
17	730823	1	f	\N	\N	\N
18	386635	1	f	\N	\N	\N
15	501117	1	t	t	5	delish!
19	1156204	1	f	\N	\N	\N
21	33083	1	f	\N	\N	\N
22	550659	1	f	\N	\N	\N
10	1184395	1	t	\N	3	\N
7	177990	1	f	t	5	\N
13	541108	1	f	t	4	\N
3	546249	1	t	t	4	It was great!\n
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (user_id, email, password, phone) FROM stdin;
1	test@test.test	test	+15599403988
2	test2@test.test	test	+15599403988
3	test4@test.test	test	+15599403988
4	user1@user.com	testuser1	+15599403988
5	mich.chen.94@gmail.com	testing	+15599403988
\.


--
-- Name: equipment_equipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.equipment_equipment_id_seq', 147, true);


--
-- Name: instructions_instruction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.instructions_instruction_id_seq', 241, true);


--
-- Name: recipe_ingredients_rec_ing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.recipe_ingredients_rec_ing_id_seq', 298, true);


--
-- Name: recipes_recipe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.recipes_recipe_id_seq', 1, false);


--
-- Name: saved_recipes_saved_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.saved_recipes_saved_id_seq', 54, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 5, true);


--
-- Name: equipment equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equipment
    ADD CONSTRAINT equipment_pkey PRIMARY KEY (equipment_id);


--
-- Name: instructions instructions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.instructions
    ADD CONSTRAINT instructions_pkey PRIMARY KEY (instruction_id);


--
-- Name: recipe_ingredients recipe_ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT recipe_ingredients_pkey PRIMARY KEY (rec_ing_id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (recipe_id);


--
-- Name: saved_recipes saved_recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_recipes
    ADD CONSTRAINT saved_recipes_pkey PRIMARY KEY (saved_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: equipment equipment_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equipment
    ADD CONSTRAINT equipment_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(recipe_id);


--
-- Name: instructions instructions_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.instructions
    ADD CONSTRAINT instructions_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(recipe_id);


--
-- Name: recipe_ingredients recipe_ingredients_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT recipe_ingredients_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(recipe_id);


--
-- Name: saved_recipes saved_recipes_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_recipes
    ADD CONSTRAINT saved_recipes_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(recipe_id);


--
-- Name: saved_recipes saved_recipes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_recipes
    ADD CONSTRAINT saved_recipes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

