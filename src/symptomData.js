export const SYMPTOM_DATA = {
  'Polyuria': {
    title: 'Frequent Urination (Polyuria)',
    definition: 'An excessive or abnormally large production or passage of urine (greater than 2.5 or 3 liters over 24 hours in adults).',
    howItMeasuresRisk: 'In diabetes, high blood sugar levels cause the kidneys to filter more blood, trying to remove the excess glucose. This process drags more water out of the body, leading to an unusually high volume of urine.',
    criticality: 'Polyuria is often one of the earliest and most recognizable primary symptoms of type 1 and type 2 diabetes. Its presence sharply increases the model\'s probabilistic risk score.',
    baseline: 'Normal urination frequency is typically 6-8 times a day. Waking up more than once at night (nocturia) or suddenly needing to urinate significantly more often without an increase in liquid intake constitutes the symptom.'
  },
  'Polydipsia': {
    title: 'Excessive Thirst (Polydipsia)',
    definition: 'An abnormal, constant, and unquenchable thirst that persists regardless of how much fluid you drink.',
    howItMeasuresRisk: 'As the body loses large amounts of water through excessive urination (polyuria) in an attempt to clear high blood sugar, it triggers severe dehydration signals in the brain, driving the urge to drink continuously.',
    criticality: 'Polydipsia is highly correlated with undiagnosed or poorly managed diabetes. It serves as a direct compensatory mechanism for the osmotic diuresis caused by hyperglycemia.',
    baseline: 'Mild thirst after exercise, spicy foods, or in hot weather is normal. Polydipsia is an intense, persistent thirst that is not satisfied by normal rehydration and is accompanied by a constantly dry mouth.'
  },
  'sudden weight loss': {
    title: 'Sudden Weight Loss',
    definition: 'An unexpected, rapid loss of body weight without deliberate changes to diet or exercise routines.',
    howItMeasuresRisk: 'When insulin is insufficient or ineffective, the body cannot move glucose into cells to use for energy. To compensate, the body starts burning fat and muscle mass at a high rate to survive, leading to rapid weight loss.',
    criticality: 'Sudden weight loss is a classic, critical indicator, especially for Type 1 diabetes. Its presence alongside polyuria and polydipsia completes the classic "triad" of major clinical diabetic symptoms.',
    baseline: 'Gradual weight loss of 1-2 lbs per week resulting from diet changes is normal. A loss of 5% or more of your total body weight within a few months without trying is clinically significant.'
  },
  'weakness': {
    title: 'General Weakness / Fatigue',
    definition: 'A pervasive feeling of being tired, sluggish, or physically weak that is not relieved by rest or sleep.',
    howItMeasuresRisk: 'Because cells cannot effectively utilize glucose for energy without properly functioning insulin, the body\'s energy levels plummet. This cellular "starvation" results in chronic, severe lethargy.',
    criticality: 'While non-specific on its own, when combined with other indicators it strongly supports a metabolic disorder prognosis. It is an extremely common early warning sign.',
    baseline: 'Occasional tiredness after a long day or lack of sleep is normal. Pathological weakness is persistent, overwhelming, and interferes with daily tasks, persisting despite adequate rest.'
  },
  'Polyphagia': {
    title: 'Excessive Hunger (Polyphagia)',
    definition: 'Extreme, insatiable hunger that persists even after consuming a large meal.',
    howItMeasuresRisk: 'Due to cellular insulin resistance or lack of insulin, glucose remains in the blood instead of entering the cells. The brain interprets this lack of cellular glucose as starvation, continuously signaling the body to eat more.',
    criticality: 'Polyphagia can point to severe metabolic dysregulation. It often occurs paradoxically alongside "Sudden Weight Loss", painting a clear picture of insulin failure.',
    baseline: 'Feeling hungry before meals or after intense activity is normal. Polyphagia is characterized by a ravenous appetite that does not subside after eating a full meal, often accompanied by strong cravings for carbohydrates.'
  },
  'visual blurring': {
    title: 'Visual Blurring',
    definition: 'A sudden loss of sharpness in eyesight, making things appear out of focus or hazy.',
    howItMeasuresRisk: 'Rapid spikes in blood sugar levels pull fluid from your body\'s tissues, including the lenses of your eyes. This swelling alters the curvature of the lens, affecting its ability to focus light properly.',
    criticality: 'Blurry vision is a high-risk indicator that blood sugar has been elevated long enough to affect microscopic blood vessels and tissues. It can be an early sign of potentially reversible diabetic complications.',
    baseline: 'Gradual vision changes requiring a new glasses prescription as you age are normal. Diabetic visual blurring often fluctuates day-to-day or week-to-week based on current blood sugar levels.'
  },
  'Itching': {
    title: 'Itching (Pruritus)',
    definition: 'Persistent, uncomfortable sensation that creates an urge to scratch, often localized to the extremities or general skin areas.',
    howItMeasuresRisk: 'High blood sugar can cause poor peripheral circulation and dry skin. It can also lead to minor, unseen yeast infections on the skin, contributing to persistent systemic itchiness.',
    criticality: 'While a secondary symptom, unexplained generalized itching—especially when dry skin treatments fail—correlates with the circulatory and neuropathic impacts of elevated glucose.',
    baseline: 'Occasional itching from bug bites, dry winter air, or mild allergies is normal. Clinical pruritus in this context is persistent, unexplainable, and often localized over the lower legs.'
  },
  'delayed healing': {
    title: 'Delayed Healing',
    definition: 'Cuts, scrapes, or bruises that take an abnormally long time to heal or frequent skin infections.',
    howItMeasuresRisk: 'High blood glucose levels restrict blood flow, starving damaged tissues of the oxygen and nutrients needed for repair. It also impairs the function of white blood cells, slowing down the immune system\'s response to inflammation and infection.',
    criticality: 'Delayed healing is a definitive sign of long-term microvascular damage and immune suppression resulting from sustained hyperglycemia.',
    baseline: 'Minor cuts typically heal within a few days to a week. If simple wounds take weeks to heal, consistently get infected, or leave dark scars, it marks a significant deviation from the baseline.'
  },
  'muscle stiffness': {
    title: 'Muscle Stiffness',
    definition: 'A feeling of tightness, rigidity, or lack of flexibility in the muscles, often accompanied by cramps or pain.',
    howItMeasuresRisk: 'Prolonged high blood sugar can damage the blood vessels that supply nerves and muscles with oxygen. Additionally, metabolic wastes can accumulate, leading to muscle fatigue, cramps, and painful stiffness.',
    criticality: 'This symptom points towards early diabetic neuropathy or reduced peripheral circulation, signaling that the metabolic disturbance is affecting the neuromuscular system.',
    baseline: 'Stiffness following an intense workout or staying in one posture for a long time is normal. Pathological stiffness occurs without physical exertion, is chronic, and often worsens at night.'
  },
  'Irritability': {
    title: 'Irritability / Mood Swings',
    definition: 'Frequent, sudden, and unprovoked shifts in mood, short temper, or generalized frustration.',
    howItMeasuresRisk: 'The brain relies heavily on a steady supply of glucose. Rapid fluctuations in blood sugar—both highs (hyperglycemia) and lows (hypoglycemia)—disrupt normal brain function, leading to confusion, anxiety, and sharp mood swings.',
    criticality: 'Although a secondary psychological marker, irritability accurately tracks the "rollercoaster" effect of uncontrolled blood glucose dynamics throughout the day.',
    baseline: 'Being irritable during stressful situations is normal human behavior. Symptomatic irritability is spontaneous, out of character, and often correlates strongly with feelings of hunger or right after eating.'
  },
  'partial paresis': {
    title: 'Partial Paresis',
    definition: 'A condition typified by a partial loss of voluntary movement, or episodes of weakness and tingling in specific limbs.',
    howItMeasuresRisk: 'Chronically high levels of glucose in the blood damage the walls of the tiny blood vessels (capillaries) that nourish your nerves, especially in the legs. This directly leads to nerve damage (neuropathy) which impairs motor control.',
    criticality: 'This is a serious secondary symptom indicating that sustained hyperglycemia has likely already caused functional nerve damage (diabetic neuropathy). It sharply increases absolute patient risk.',
    baseline: 'Experiencing a limb "falling asleep" due to pressure on a nerve is perfectly normal. Partial paresis features distinct, persistent weakness, dropping items frequently, or a "pins and needles" sensation without a physical cause.'
  },
  'Genital thrush': {
    title: 'Genital Thrush',
    definition: 'A yeast infection (candidiasis) around the genital area, leading to itching, irritation, and sometimes a white discharge.',
    howItMeasuresRisk: 'High blood sugar creates an ideal breeding ground for yeast (Candida) to thrive, particularly in warm, moist areas like the genitals. Excess glucose is also secreted in urine, fueling the infection.',
    criticality: 'Frequent or difficult-to-treat yeast infections can be an early indicator of chronically high blood glucose levels and weakened immune response.',
    baseline: 'Occasional yeast infections can occur due to antibiotics or other factors. However, recurrent, unprovoked thrush that does not respond well to standard treatments is highly clinically significant for reviewing blood sugar levels.'
  },
  'Alopecia': {
    title: 'Alopecia (Hair Loss)',
    definition: 'Unexpected thinning of the hair, hair loss in patches, or general reduction in hair volume.',
    howItMeasuresRisk: 'Poor blood circulation caused by high blood sugar can damage the hair follicles, preventing them from receiving the necessary nutrients and oxygen to grow. Hormonal imbalances associated with metabolic issues can also accelerate hair loss.',
    criticality: 'While a secondary and often overlooked symptom, alopecia combined with other metabolic indicators can highlight systemic microvascular and endocrine disruption in the body.',
    baseline: 'Gradual hair thinning due to aging or genetics is expected. Sudden, widespread hair loss or patchy baldness without an obvious cause, concurrent with lethargy or weight changes, deviates from the norm.'
  }
};
