import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TypingTimer from "../Typing/TypingTimer";
import { diffWords } from "diff";
import "./TypingTest.css";
import { Helmet } from "react-helmet-async";
import TypingHeader from "../component/Header";
import MainFooter from "../Footermain/Footer";

const TypingTest = () => {
  const { testId } = useParams();
  const [testData, setTestData] = useState(null);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [rmTm, setRmTm] = useState(null);
  const [results, setResults] = useState(null);

  const tests = {
    // SSC CGL Typing Tests (400+ words)
    "ssc-cgl-typing-test-01": {
        name: "SSC CGL Free Typing Test 1",
        time: 15,
        paragraph: `Democracy, as a system of governance, traces its origins to ancient Greece, particularly in the city-state of Athens during the 5th century BCE. The Athenian model, often regarded as the first democracy, allowed citizens to participate directly in decision-making. However, this early form of governance was far from inclusive. Women, slaves, and non-citizens were excluded, limiting the number of eligible participants. Despite its shortcomings, the Athenian system laid the groundwork for future democratic models.
    
    As history progressed, the idea of democracy evolved. In 1215, the Magna Carta in England marked a significant shift towards limiting the powers of rulers and establishing certain rights for citizens. This document, though not democratic in the modern sense, planted the seeds for constitutional governance. The American Revolution in 1776 and the French Revolution in 1789 further propelled democratic ideals, emphasizing liberty, equality, and fraternity. These movements showcased the power of collective action and the importance of representing the will of the people.
    
    Modern democracies are built on principles of universal suffrage, the rule of law, and the separation of powers. Representative democracy, where citizens elect officials to make decisions on their behalf, has become the most common form. This system balances the need for broad participation with the practicalities of governance in large, complex societies. Despite these advancements, democracy faces numerous challenges in the contemporary world. Issues like voter suppression, political corruption, and the influence of money in politics threaten its integrity. Additionally, the rise of authoritarian regimes and the erosion of democratic norms in some countries highlight the fragility of this system.
    
    Democracy’s greatest strength lies in its adaptability and resilience. By providing a framework for peaceful transitions of power and enabling citizens to voice their opinions, democracy fosters social stability and innovation. While imperfect, it remains the most effective system for ensuring individual freedoms and promoting collective welfare. As we reflect on its origins, it is essential to safeguard democratic values and address the challenges it faces to create a more inclusive and equitable future.`,
      },
      "ssc-cgl-typing-test-02": {
        name: "SSC CGL Free Typing Test 2",
        time: 15,
        paragraph: `The Industrial Revolution was a transformative period in human history, marking a shift from agrarian economies to industrialized societies. Beginning in the late 18th century in Britain, this era brought about significant technological, economic, and social changes that shaped the modern world.
    
    Central to the Industrial Revolution was the advent of new technologies. The invention of the steam engine by James Watt revolutionized transportation and manufacturing, enabling the mass production of goods. Machines like the spinning jenny and power loom transformed the textile industry, increasing productivity and reducing reliance on manual labor. Factories became the new centers of production, replacing traditional cottage industries.
    
    The revolution also had a profound impact on urbanization. As factories proliferated, people migrated from rural areas to cities in search of work, leading to rapid urban growth. Cities like Manchester and Birmingham became industrial hubs, teeming with workers and entrepreneurs. This migration reshaped societal structures, creating a new working class while also widening the gap between the rich and the poor.
    
    Economically, the Industrial Revolution spurred unprecedented growth. Mass production lowered the cost of goods, making them more accessible to the general population. Trade expanded as transportation networks, including railways and steamships, improved. However, this rapid industrialization came at a cost. Working conditions in factories were often harsh, with long hours, low wages, and unsafe environments. Child labor was prevalent, prompting calls for labor reforms.
    
    The Industrial Revolution also had environmental consequences. The widespread use of coal and other fossil fuels led to air and water pollution, a legacy that continues to impact the planet. Deforestation and the exploitation of natural resources intensified, highlighting the environmental cost of industrial progress.
    
    Despite its challenges, the Industrial Revolution laid the groundwork for modern society. It ushered in an era of innovation and technological advancement, from electricity to automobiles. The lessons of this period emphasize the importance of balancing progress with social and environmental responsibility.
    
    The Industrial Revolution was not merely a historical event but a turning point that continues to influence our lives today. Its legacy is a testament to human ingenuity and the relentless pursuit of progress.`,
      },
      "ssc-cgl-typing-test-03": {
        name: "SSC CGL Free Typing Test 3",
        time: 15,
        paragraph: `The human brain is one of the most complex and fascinating organs in the body, often described as the command center of the human nervous system. Weighing approximately three pounds, it contains billions of neurons that communicate through trillions of synaptic connections. This intricate network enables humans to think, feel, and act, making the brain the foundation of our cognitive abilities, emotions, and behaviors.
    
    One of the most remarkable aspects of the brain is its ability to process and store information. The brain can analyze vast amounts of sensory data from the environment, such as sights, sounds, and smells, in milliseconds. Memory, one of its core functions, allows humans to retain and recall information, enabling learning and adaptation. The hippocampus, a small region in the brain, plays a critical role in forming and retrieving memories.
    
    The brain is also the origin of creativity and innovation. It allows us to imagine, solve problems, and create art, music, and technology. The prefrontal cortex, responsible for executive functions like decision-making and planning, enables humans to navigate complex social and professional environments. This ability to innovate has set humans apart as a species.
    
    Despite its capabilities, the brain remains a subject of ongoing study, with many mysteries still unsolved. Neurological disorders such as Alzheimer’s disease, Parkinson’s disease, and epilepsy highlight the vulnerability of this vital organ. Advances in neuroscience and technology, such as brain imaging and artificial intelligence, are helping researchers understand the brain's mechanisms and develop treatments for these conditions.
    
    One of the brain's most intriguing features is its plasticity—the ability to adapt and reorganize itself throughout life. This plasticity is particularly evident in individuals recovering from injuries or adapting to new skills. The brain’s resilience and capacity for change underscore its extraordinary potential.
    
    The study of the brain not only deepens our understanding of ourselves but also inspires technological advancements. From brain-computer interfaces to therapies for mental health, the exploration of this organ continues to revolutionize science and medicine. As we unlock its secrets, the brain remains a testament to the complexity and wonder of human life.`,
      },
      "ssc-cgl-typing-test-04": {
        name: "SSC CGL Free Typing Test 4",
        time: 15,
        paragraph: `The Age of Exploration, spanning the 15th to the 17th centuries, was a transformative period in world history. It marked the beginning of extensive global interaction, as European explorers set sail to discover new trade routes, lands, and resources. This era reshaped economies, cultures, and geopolitics, leaving a profound impact on the world.
    
    One of the main motivations behind exploration was the search for alternate trade routes to Asia. Spices, silk, and other luxury goods were highly sought after in Europe, but traditional overland routes were expensive and controlled by powerful empires. This economic drive, combined with advances in navigation and shipbuilding, led to ambitious expeditions across uncharted waters.
    
    Portuguese explorers played a pioneering role during this era. Prince Henry the Navigator established navigation schools that trained sailors and mapmakers, enabling Portugal to lead early exploration efforts. Vasco da Gama’s successful voyage to India in 1498 opened up direct trade routes, enriching the Portuguese Empire. Meanwhile, Christopher Columbus, sailing under the Spanish flag, reached the Americas in 1492, initiating European colonization in the New World.
    
    The Age of Exploration also saw the rise of the Spanish Empire. Ferdinand Magellan’s expedition, the first to circumnavigate the globe, demonstrated the vastness of Earth and the interconnectedness of its oceans. Spanish conquistadors like Hernán Cortés and Francisco Pizarro expanded the empire through their conquests of the Aztec and Inca civilizations, respectively.
    
    However, the Age of Exploration came at a significant cost. Colonization led to the exploitation of indigenous populations, the spread of diseases like smallpox, and the destruction of cultural heritage. The transatlantic slave trade, driven by the demand for labor in the colonies, remains one of the darkest legacies of this period.
    
    Despite its controversies, the Age of Exploration expanded human knowledge. New lands, resources, and cultures were documented, transforming science and geography. The exchange of goods, crops, and ideas—known as the Columbian Exchange—profoundly altered economies and diets worldwide, introducing potatoes, maize, and tomatoes to Europe and wheat and horses to the Americas.
    
    The Age of Exploration was a turning point in history, ushering in globalization and laying the foundations for the modern world. While its impacts were both positive and negative, it remains a testament to human curiosity and the drive to push beyond known horizons.`,
      },
      "ssc-cgl-typing-test-05": {
        name: "SSC CGL Free Typing Test 5",
        time: 15,
        paragraph: `William Shakespeare, often referred to as the "Bard of Avon," remains one of the most celebrated figures in English literature. His works, created over four centuries ago, continue to captivate audiences worldwide with their timeless themes, complex characters, and masterful use of language. From his tragedies and comedies to his history plays and sonnets, Shakespeare's contributions to literature have left an indelible mark on the world.
    
    One of the reasons for Shakespeare’s enduring appeal is the universality of his themes. Plays like Macbeth, Hamlet, and Othello explore human emotions such as ambition, love, jealousy, and revenge—emotions that resonate across cultures and eras. For instance, Romeo and Juliet delves into the intensity of young love and the tragedy of familial conflict, themes that remain relevant today. Similarly, King Lear reflects on aging, authority, and the complexities of parent-child relationships, topics that continue to spark reflection and discussion.
    
    Shakespeare’s characters are another hallmark of his genius. Unlike stereotypical figures of his time, Shakespeare’s characters possess psychological depth and complexity. Hamlet, with his indecision and introspection, or Lady Macbeth, with her ambitious yet guilt-ridden persona, are examples of multi-dimensional characters that invite diverse interpretations. Their struggles and triumphs mirror the human condition, allowing audiences to connect on a deeply personal level.
    
    The language of Shakespeare’s works also contributes to their immortality. His inventive use of metaphors, similes, and wordplay enriches his writing, making it both poetic and profound. Phrases such as “to be or not to be” from Hamlet and “all the world’s a stage” from As You Like It have become part of everyday language. Shakespeare’s ability to weave humor, wit, and wisdom into his texts ensures their relevance across generations.
    
    Moreover, Shakespeare’s influence extends beyond literature. His works have inspired countless adaptations in theater, film, and other art forms. Directors reinterpret his plays to address contemporary issues, showcasing their adaptability and cultural significance.
    
    In a rapidly changing world, Shakespeare’s works remind us of the enduring nature of human experiences. By addressing timeless questions about identity, morality, and destiny, Shakespeare invites readers and audiences to reflect on their own lives. His legacy, much like his words, is immortal, ensuring his place at the heart of English literature.`,
      },
    

        // SSC CHSL Typing Tests (350+ words)
        "ssc-chsl-typing-test-01": {
          name: "SSC CHSL Free Typing Test 1",
          time: 12,
          paragraph: `The oceans, covering more than 70% of the Earth’s surface, are home to a vast array of biodiversity that supports life both underwater and on land. From coral reefs teeming with vibrant marine life to deep-sea ecosystems yet to be fully explored, ocean biodiversity is vital for ecological balance, global food security, and climate regulation. However, this invaluable resource faces numerous threats, including overfishing, pollution, and climate change.
      
      Coral reefs, often referred to as the "rainforests of the sea," are among the most threatened ecosystems. Rising sea temperatures and ocean acidification, caused by increased CO2 absorption, have led to widespread coral bleaching events. These changes disrupt the delicate balance of reef ecosystems, affecting countless marine species that depend on coral habitats for survival. Additionally, overfishing has led to a decline in key species such as tuna and sharks, creating cascading effects throughout the marine food web.
      
      Plastic pollution is another grave issue. Each year, millions of tons of plastic waste enter the oceans, endangering marine life that mistakes it for food or becomes entangled in debris. Microplastics, tiny fragments of degraded plastic, have infiltrated marine ecosystems, impacting species from plankton to whales and even entering the human food chain through seafood.
      
      Efforts to preserve ocean biodiversity are underway, but they require global collaboration. Marine protected areas (MPAs) serve as sanctuaries, allowing ecosystems to recover and thrive. International agreements, such as the United Nations' Ocean Decade initiative, aim to promote sustainable management of marine resources. Technological advancements, including satellite monitoring and AI-powered tools, aid in tracking illegal fishing and pollution.
      
      Public awareness and grassroots activism play crucial roles in driving change. Simple actions, like reducing single-use plastics and supporting sustainable seafood, can collectively make a significant difference. Governments, scientists, and communities must work together to combat threats and ensure that future generations inherit healthy and vibrant oceans.
      
      Preserving ocean biodiversity is not just an environmental imperative—it is a commitment to safeguarding the planet’s life support system and our shared future.`,
        },
        "ssc-chsl-typing-test-02": {
          name: "SSC CHSL Free Typing Test 2",
          time: 12,
          paragraph: `Quantum computing is an emerging field with the potential to revolutionize industries by solving complex problems far beyond the capabilities of classical computers. Unlike traditional computing, which relies on bits represented as 0s and 1s, quantum computing uses quantum bits or qubits. These qubits exploit the principles of superposition and entanglement, enabling them to perform multiple calculations simultaneously. This unprecedented computational power opens doors to groundbreaking applications across various domains.
      
      One of the most promising applications of quantum computing is in cryptography. Current encryption systems rely on mathematical problems that are computationally expensive for classical computers to solve. However, quantum computers can break these codes, necessitating the development of quantum-resistant encryption methods. In the field of materials science, quantum computing enables precise simulations of molecular interactions, accelerating the discovery of new materials with applications ranging from pharmaceuticals to energy storage.
      
      The financial sector also stands to benefit from quantum algorithms that optimize investment portfolios and enhance risk analysis. In logistics, quantum computers can solve complex optimization problems, such as route planning for delivery networks, reducing costs and improving efficiency. Additionally, quantum machine learning promises to revolutionize artificial intelligence by processing vast datasets more effectively.
      
      Despite its immense potential, the development of quantum computing faces significant challenges. Qubits are highly sensitive to environmental disturbances, which can lead to errors in calculations. Maintaining quantum coherence requires extremely low temperatures and sophisticated isolation techniques. Moreover, the technology is currently in its infancy, and practical, large-scale quantum computers are still years away.
      
      The race to harness quantum computing involves governments, academic institutions, and private companies worldwide. Investments in research and infrastructure are accelerating progress, while collaborations aim to address technical hurdles. As quantum computing matures, it holds the promise of transforming industries, solving global challenges, and advancing scientific knowledge to unprecedented levels.`,
        },
        "ssc-chsl-typing-test-03": {
          name: "SSC CHSL Free Typing Test 3",
          time: 12,
          paragraph: `Climate change is one of the most pressing challenges of the 21st century, with profound implications for ecosystems, economies, and societies. Addressing this global issue requires robust mitigation strategies aimed at reducing greenhouse gas emissions and promoting sustainability. 
      
      One key approach is transitioning to renewable energy sources such as solar, wind, and hydroelectric power. These alternatives significantly decrease dependence on fossil fuels, which are the primary contributors to carbon emissions. Another effective strategy is enhancing energy efficiency in industries, homes, and transportation systems. For instance, the adoption of electric vehicles (EVs) and smart grids has already demonstrated potential in reducing environmental impact.
      
      Forestation and reforestation efforts play a vital role in absorbing atmospheric carbon dioxide. Protecting existing forests while restoring degraded ones can help balance carbon cycles. Additionally, climate-smart agriculture, which includes practices like precision farming and crop rotation, contributes to reducing emissions while ensuring food security. Urban areas, being significant contributors to emissions, must embrace sustainable urban planning. Cities can reduce their carbon footprint by incorporating green infrastructure, improving public transportation, and encouraging the use of bicycles or walking.
      
      However, achieving these goals demands collaboration on a global scale. International agreements like the Paris Accord serve as frameworks for nations to set and achieve emission reduction targets. Governments, private sectors, and individuals all have roles to play in combating climate change. Investments in green technologies and research can drive innovation and make sustainable solutions more accessible.
      
      While these strategies offer hope, challenges persist. Political resistance, economic constraints, and public awareness gaps hinder progress. Yet, the urgency of the climate crisis underscores the importance of overcoming these barriers. The future of climate mitigation lies in collective action, where communities worldwide unite to create a sustainable planet for future generations.`,
        },
        "ssc-chsl-typing-test-04": {
          name: "SSC CHSL Free Typing Test 4",
          time: 12,
          paragraph: `Artificial Intelligence (AI) is reshaping healthcare by revolutionizing diagnosis, treatment, and patient care. By utilizing advanced algorithms, AI enables the analysis of vast datasets with precision, uncovering patterns that human observation might overlook. 
      
      For example, AI-powered systems are now capable of detecting early signs of diseases such as cancer through imaging scans, improving the accuracy of diagnoses and outcomes for patients. These tools have significantly reduced the time required for diagnosis, allowing healthcare professionals to focus on personalized care. Moreover, AI is driving innovation in drug discovery, facilitating the identification of potential new treatments at a fraction of the time and cost traditionally required. 
      
      Wearable technology, integrated with AI, helps in continuous health monitoring, alerting individuals and physicians to anomalies in real-time. This proactive approach to health management can prevent minor issues from developing into serious conditions.
      
      Another area where AI has made a profound impact is telemedicine. By offering virtual consultations and remote diagnostics, AI bridges the gap for patients in underserved or rural regions. It ensures accessibility to medical expertise, reducing travel burdens and associated costs.
      
      However, the integration of AI in healthcare comes with its challenges. Ethical concerns, such as ensuring data privacy and avoiding algorithmic biases, remain significant hurdles. Furthermore, there is a pressing need for transparency in how AI systems make decisions, especially when they are used in life-critical scenarios.
      
      Collaboration between AI developers, healthcare professionals, and policymakers is crucial to address these challenges effectively. With proper regulations and standards, the potential of AI to democratize healthcare and make it more efficient is immense. As this technology continues to evolve, it promises a future where healthcare is not only more accessible but also tailored to the individual needs of patients, ensuring better outcomes for all.`,
        },
        "ssc-chsl-typing-test-05": {
          name: "SSC CHSL Free Typing Test 5",
          time: 12,
          paragraph: `The global shift to remote work, accelerated by the COVID-19 pandemic, has fundamentally transformed how businesses operate and employees collaborate. What initially began as a necessity has now evolved into a preferred working model for many, with profound implications for productivity, work-life balance, and organizational culture. 
      
      The future of remote work lies in finding the right balance between flexibility and efficiency, supported by technological advancements and innovative management practices. One of the most significant benefits of remote work is the increased flexibility it offers employees. Without the constraints of a daily commute, workers have more time to focus on personal responsibilities, pursue hobbies, and achieve a better work-life balance.
      
      For employers, remote work expands access to a global talent pool, enabling organizations to hire individuals based on skills rather than geographical proximity. This diversity fosters innovation and brings fresh perspectives to problem-solving.
      
      Technology plays a pivotal role in the success of remote work. Tools such as video conferencing platforms, cloud-based collaboration software, and project management applications have bridged the physical distance between teams. Virtual reality (VR) and augmented reality (AR) technologies are also emerging as potential solutions to enhance remote collaboration, creating immersive environments that replicate the experience of in-person interactions.
      
      However, remote work is not without challenges. Maintaining employee engagement and cohesion in a virtual setting requires intentional effort. Organizations must prioritize clear communication, foster a sense of belonging, and offer opportunities for professional development. Moreover, the blurred boundaries between work and personal life can lead to burnout if not managed effectively.
      
      The hybrid work model, which combines remote and in-office work, is gaining popularity as a solution to these challenges. By offering flexibility while preserving opportunities for face-to-face interaction, hybrid models aim to capture the best of both worlds. 
      
      Governments and businesses must also address issues of digital inequality, ensuring that remote work remains accessible to all. As remote work becomes a permanent feature of the modern workforce, its future will depend on continuous innovation, adaptive leadership, and a commitment to employee well-being.`,
        },

    // RRB Typing Tests (350+ words)
    "rrb-typing-test-01": {
        name: "RRB Typing Free Test 1",
        time: 10,
        paragraph: `The Indian Railways is an integral part of the country's infrastructure and plays a vital role in the nation’s development. Spanning over 68,000 kilometers, it is one of the largest rail networks in the world and serves as a lifeline for millions of people. From connecting rural areas to bustling cities, the railway network enhances mobility and fosters economic growth. Over the years, the Indian Railways has undergone significant modernization, introducing high-speed trains, improved passenger services, and advanced digital ticketing systems. These advancements have not only enhanced efficiency but also elevated passenger experiences.
    
    Despite these achievements, the railway system faces significant challenges. Overcrowding on trains, especially during festive seasons, remains a persistent issue. Many rural areas still lack adequate connectivity, limiting opportunities for economic development. Additionally, aging infrastructure and outdated technology hinder operational efficiency and safety. Train delays, maintenance issues, and accidents highlight the urgent need for modernization and investment in infrastructure upgrades.
    
    To address these challenges, the government has initiated various projects such as the introduction of bullet trains and the electrification of railway lines. These measures aim to make train travel faster, safer, and more eco-friendly. Moreover, the adoption of Artificial Intelligence (AI) and IoT-enabled technologies has improved predictive maintenance, ensuring smoother operations. Public-private partnerships are also being explored to boost investment and enhance service delivery.
    
    The future of Indian Railways lies in its ability to adapt to changing times while preserving its heritage. Sustainable practices, such as using renewable energy sources for train operations, are being implemented to reduce the carbon footprint. With continued efforts, the Indian Railways can overcome its challenges and continue to be a driving force behind the nation’s progress, connecting people, cultures, and opportunities like never before.`,
      },
      "rrb-typing-test-02": {
        name: "RRB Typing Free Test 2",
        time: 10,
        paragraph: `Urbanization is a global phenomenon transforming cities and societies at an unprecedented pace. In India, urban areas account for over 34% of the total population, and this number is steadily rising. Cities are becoming hubs of economic activity, offering better job opportunities, education, healthcare, and infrastructure. However, this rapid growth has brought its share of challenges, necessitating innovative solutions for sustainable urban development.
    
    One of the key aspects of urbanization is the need for efficient public transportation systems. Cities like Delhi and Mumbai have implemented metro systems that reduce traffic congestion and pollution. Smart city initiatives, which integrate technology with urban planning, aim to improve the quality of life for citizens. Projects like digital traffic management, renewable energy integration, and green building designs have set new benchmarks for sustainable development.
    
    However, the unplanned and haphazard expansion of cities often leads to problems such as inadequate housing, water scarcity, and waste management issues. Slums and informal settlements are on the rise, highlighting the urgent need for affordable housing solutions. Urban flooding due to poor drainage systems is another pressing issue that requires immediate attention. Moreover, pollution levels in urban areas often exceed permissible limits, affecting public health and overall well-being.
    
    To address these issues, urban planners are focusing on adopting innovative strategies like mixed-use development, which combines residential, commercial, and recreational spaces to optimize land use. Encouraging the use of electric vehicles and promoting cycling lanes are steps toward building eco-friendly cities. Public participation and community-driven initiatives are also crucial for the success of urban development programs.
    
    In conclusion, urbanization presents a dual challenge: while it creates opportunities for growth, it also demands careful planning and sustainable practices to ensure a balanced and inclusive future. By prioritizing equitable development and environmental conservation, cities can become thriving centers of innovation and well-being.`,
      },
      "rrb-typing-test-03": {
        name: "RRB Typing Free Test 3",
        time: 10,
        paragraph: `Tourism plays a pivotal role in boosting economies, creating employment opportunities, and fostering cultural exchange. In India, tourism contributes significantly to the GDP, offering diverse experiences ranging from historical monuments and natural wonders to spiritual journeys and adventure activities. Iconic destinations like the Taj Mahal, Jaipur’s palaces, and Kerala’s backwaters attract millions of domestic and international tourists annually.
    
    One of the greatest strengths of Indian tourism lies in its cultural richness and heritage. With over 38 UNESCO World Heritage Sites, the country showcases an unparalleled array of architectural marvels, ancient ruins, and sacred temples. Festivals like Diwali, Holi, and Durga Puja further highlight India’s vibrant traditions, drawing visitors eager to witness its cultural grandeur. Wildlife tourism, with sanctuaries like Ranthambore and Jim Corbett, offers an up-close experience of India’s rich biodiversity.
    
    Despite its potential, the tourism sector faces several challenges. Infrastructure gaps, including inadequate transportation and limited accommodation facilities in remote areas, hinder growth. Over-tourism in certain regions has led to environmental degradation, threatening the very attractions that draw visitors. Additionally, a lack of awareness and promotion of lesser-known destinations limits the diversity of experiences offered to tourists.
    
    To address these challenges, the government has launched initiatives such as the "Incredible India" campaign, which markets the country as a top-tier travel destination. Investments in infrastructure development, eco-tourism projects, and digital platforms for seamless bookings are making travel more accessible. Community-based tourism is being encouraged to empower local populations while preserving cultural authenticity.
    
    Tourism in India holds immense potential to drive sustainable development and cultural exchange. By focusing on responsible tourism practices, promoting lesser-explored destinations, and investing in infrastructure, the sector can thrive while preserving its cultural and natural treasures for generations to come.`,
      },
      "rrb-typing-test-04": {
        name: "RRB Typing Free Test 4",
        time: 10,
        paragraph: `The digital revolution has fundamentally transformed the way societies operate, bringing unprecedented changes to communication, business, and education. The rise of the internet and smartphones has enabled instant connectivity, bridging geographical divides and fostering global interactions. In India, the rapid adoption of digital technologies has spurred economic growth and innovation, making it a global hub for information technology.
    
    One of the most notable impacts of the digital revolution is the growth of e-commerce. Platforms like Amazon and Flipkart have redefined retail, allowing consumers to shop from the comfort of their homes. The convenience of digital payments, facilitated by apps like Paytm and Google Pay, has further accelerated the shift towards a cashless economy. Businesses, both big and small, are leveraging digital tools to reach wider audiences and improve operational efficiency.
    
    The education sector has also witnessed a digital transformation. Online learning platforms like BYJU’S and Coursera have made quality education accessible to students in remote areas. Virtual classrooms and digital libraries are bridging the gap between urban and rural education. However, the digital divide remains a significant challenge, with many regions lacking access to high-speed internet and digital devices.
    
    The digital revolution has also raised concerns about data privacy and cybersecurity. As more personal and financial information moves online, the risk of cyberattacks and data breaches has increased. Governments and organizations are working on stringent regulations and advanced security measures to protect users.
    
    In conclusion, the digital revolution has opened up a world of opportunities, transforming industries and empowering individuals. While challenges remain, the continuous evolution of technology promises a future where digital innovations drive inclusive growth and development. By addressing inequalities and ensuring digital literacy, societies can harness the full potential of this revolution.`,
      },
      "rrb-typing-test-05": {
        name: "RRB Typing Free Test 5",
        time: 10,
        paragraph: `Education is a cornerstone of societal development, serving as the foundation for economic progress, social mobility, and personal growth. In India, the education system has evolved over centuries, reflecting the country’s rich cultural heritage and modern aspirations. From ancient gurukuls to contemporary digital classrooms, education remains a powerful tool for transformation.
    
    One of the significant milestones in Indian education was the introduction of the Right to Education (RTE) Act in 2009, which guarantees free and compulsory education for children aged 6 to 14 years. This initiative has led to increased enrollment rates and a reduction in dropout levels, particularly in rural areas. Digital learning platforms, such as Khan Academy and Unacademy, have further democratized access to education, enabling students to learn at their own pace.
    
    However, the education sector faces persistent challenges. A lack of infrastructure, including insufficient schools, classrooms, and qualified teachers, hampers progress in many regions. The quality of education often varies, with urban schools outperforming rural institutions. Additionally, the COVID-19 pandemic exposed digital disparities, as many students lacked access to devices and internet connectivity for online learning.
    
    Efforts to bridge these gaps include government initiatives like "Digital India" and the National Education Policy (NEP) 2020, which aims to make education more holistic, flexible, and technology-driven. Emphasis on vocational training and skill development is also equipping students to meet the demands of a rapidly changing job market.
    
    Education is not just a means to acquire knowledge but a pathway to empowerment. By addressing existing challenges and fostering innovation, India can ensure that education serves as a catalyst for inclusive growth and sustainable development. A well-educated population is key to building a prosperous and equitable society, shaping the nation’s future on the global stage.`,
      },
  };
  
  

  useEffect(() => {
    setTestData(tests[testId]);
  }, [testId]);

  const handleInputChange = (e) => {
    if (!typing) setTyping(true); // Start typing when the user begins
    setMessage(e.target.value);
  };

  const calculateResults = () => {
    if (!rmTm) return;

    const originalText = testData.paragraph.trim();
    const userInput = message.trim();

    const diff = diffWords(originalText, userInput);

    let correctChars = 0;
    let wrongChars = 0;
    const totalChars = originalText.length;

    diff.forEach((part) => {
      if (!part.added && !part.removed) {
        correctChars += part.value.length;
      } else if (part.added) {
        wrongChars += part.value.length;
      }
    });

    const timeParts = rmTm.split(":").map(Number);
    const totalTestSeconds = testData.time * 60;
    const timeUsed =
      totalTestSeconds - (timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2]);

    const accuracy = ((correctChars / totalChars) * 100).toFixed(2);
    const wpm = Math.round((userInput.split(" ").length * 60) / timeUsed);

    setResults({
      accuracy,
      wpm,
      correctChars,
      wrongChars,
      totalChars,
    });
    setTyping(false);
  };

  if (!testData) return <div>Loading...</div>;

  return (
    <>
          <Helmet>
        <title>{`${testData.name} - Free Typing Test`}</title>
        <meta
          name="description"
          content={`Practice your typing skills with ${testData.name}. Test your speed and accuracy with this free typing test.`}
        />
        <meta
          name="keywords"
          content={`${testData.name}, free typing test, typing speed, typing accuracy, SSC typing test, typing practice`}
        />
        <meta name="author" content="Testdesk" />
        <meta name="robots" content="index, follow" />
        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content={`${testData.name} - Free Typing Test`}
        />
        <meta
          property="og:description"
          content={`Practice your typing skills with ${testData.name}. Test your speed and accuracy with this free typing test.`}
        />
        <meta property="og:url" content={`https://testdesk.in/online-free-typing-test/${testId}`} />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${testData.name} - Free Typing Test`}
        />
        <meta
          name="twitter:description"
          content={`Practice your typing skills with ${testData.name}. Test your speed and accuracy with this free typing test.`}
        />
        <link rel="canonical" href={`https://testdesk.in/online-free-typing-test/${testId}`} />
      </Helmet>
      <TypingHeader/>
    <div className="typing-test-container-free-test-typing">
      <div className="header-free-test-typing">
        <h1>{testData.name}</h1>
        <div className="timer-free-test-typing">
          Time Left:{" "}
          {typing ? (
            <TypingTimer
              hoursMinSecs={{ hours: 0, minutes: testData.time, seconds: 0 }}
              rmTimeFun={(time) => setRmTm(time)}
            />
          ) : (
            `${testData.time} m 0 s`
          )}
        </div>
      </div>

      <div className="paragraph-box-free-test-typing">
        <p>{testData.paragraph}</p>
      </div>

      <div className="typing-box-free-test-typing">
        <textarea
        className="typing-box-free-test-typing-text"
          value={message}
          onChange={handleInputChange}
          placeholder="Start typing..."
        ></textarea>
        <div className="buttons-free-test-typing">
          <button onClick={() => window.location.reload()}>Restart</button>
          <button onClick={calculateResults}>Submit Test</button>
        </div>
      </div>
      </div>
      {results && (
  <div className="results-section-free-test-typing">
    <h3>Results</h3>
    <table className="free-typing-test-table">
      <thead>
        <tr className="free-typing-test-table">
          <th className="free-typing-test-table">Metric</th>
          <th className="free-typing-test-table">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr className="free-typing-test-table">
          <td className="free-typing-test-table">Accuracy</td>
          <td className="free-typing-test-table">{results.accuracy}%</td>
        </tr>
        <tr className="free-typing-test-table">
          <td className="free-typing-test-table">WPM</td>
          <td className="free-typing-test-table">{results.wpm}</td>
        </tr>
        <tr className="free-typing-test-table">
          <td className="free-typing-test-table">Correct Characters</td>
          <td className="free-typing-test-table">{results.correctChars}</td>
        </tr>
        <tr className="free-typing-test-table">
          <td className="free-typing-test-table">Wrong Characters</td>
          <td className="free-typing-test-table">{results.wrongChars}</td>
        </tr>
        <tr className="free-typing-test-table">
          <td className="free-typing-test-table">Total Characters</td>
          <td className="free-typing-test-table">{results.totalChars}</td>
        </tr>
      </tbody>
    </table>

    {/* Additional Message Section */}
    <div className="additional-message-section-free">
      <p className="message-free">
        Congratulations on completing your free typing test! If you want to buy the advanced typing test, which mirrors the exact interface of the real TCS e-Typing Test, click the button below.
      </p>
      <p className="progress-check-free">
        You can also track your progress and improve your typing skills further with our premium plans.
      </p>
      <button
        className="buy-now-button-free"
        onClick={() => (window.location.href = "/ssc-typing-test/buy-now")}
      >
        Buy Now
      </button>
    </div>
  </div>
)}





  
    <div className="info-section-free-test-typing">
  <h2>Formula to Calculate Typing Speed</h2>
  <p><strong>CW:</strong> Total correct typed words</p>
  <p><strong>RW:</strong> Total incorrect typed words</p>
  <p><strong>TW:</strong> Total typed words (CW + RW)</p>
  <p><strong>Typing Speed (WPM):</strong> CW / Time (in minutes)</p>
  <p><strong>Accuracy:</strong> (CW / TW) × 100%</p>

  <h2>Guidelines for Proficiency/Skill Test</h2>
  <p>
    In the Combined Graduate Level Examination (CGL), specific posts such as Assistant (CSS) and Tax Assistant for CBEC and CBDT require proficiency in typing. 
    For the Tax Assistant role, candidates must achieve a typing speed of 8000 key depressions per hour through the Data Entry Skill Test (DEST).
  </p>
  <p>
    The test is conducted over 15 minutes, including a 5-minute practice session to allow candidates to adjust to the provided system and keyboard. 
    Candidates are encouraged to use the remaining time to correct any errors. The skill test is qualifying in nature, evaluated on both speed and accuracy.
  </p>

  <h2>Familiarizing Yourself with the SSC CGL Typing Test</h2>
  <p>
    The SSC CGL typing test measures both speed and precision, critical for meeting the eligibility criteria. 
    Our platform simulates real-world conditions, helping candidates gain familiarity with the test’s structure, timing, and level of difficulty.
  </p>

  <h2>Key Benefits of Real-Time Practice</h2>
  <ul>
    <li><strong>Improve Typing Speed:</strong> Regular practice helps candidates consistently achieve or exceed the required words per minute (WPM) benchmark.</li>
    <li><strong>Enhance Accuracy:</strong> Precision is crucial during the typing test. Our platform aids in reducing typing errors, ensuring balanced speed and accuracy.</li>
    <li><strong>Adapt to Test Conditions:</strong> Simulations replicate the actual exam environment, preparing candidates to handle time constraints effectively and perform under pressure.</li>
  </ul>
</div>
<MainFooter/>
   </>
  );
};

export default TypingTest;
