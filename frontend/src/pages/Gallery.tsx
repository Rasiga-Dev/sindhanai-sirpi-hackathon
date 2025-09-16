


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp } from "react-icons/fa";
import ImageSlider from './ImageSlider';

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [

    {
      image: "image-1.jpg",
      title: "Vosa Tech Signs MOU with EDII-TN to Launch Private School Hackathon Across Seven Districts",
      description: "We are excited to announce that Vosa Tech, Tirunelveli, has officially signed an MOU with EDII-TN to collaboratively organize a Private School Hackathon across seven districts-Madurai, Thoothukudi, Tirunelveli, Virudhunagar, Kanyakumari,Dindigul and Tenkasi! This initiative aims to empower school students with hands-on experience in innovation, problem-solving, and technology, fostering the next generation of tech leaders. A special thanks to Dr. Ambalavanan IAAS for signing this MOU and supporting this transformative journey. We are proud to be part of this mission to inspire young minds and drive digital innovation! Stay tuned for more updates. Let's build the future together!",
      details: "Vosa Tech Signs MOU."
    },
    {
      image: "kanimozhli lightson1.jpg",
      title: "Honourable Kanimozhi Karunanidhi Inaugurates Sindhanai Sirpi Hackathon",
      description: "The Sindhanai Sirpi Hackathon was inaugurated with great enthusiasm and dignity. The ceremony was graced by the presence of Honourable Kanimozhi Karunanidhi, who presided over the event and lit the traditional lamp, marking the auspicious beginning of the program. Her participation added immense value to the occasion, inspiring students, teachers, and innovators to actively engage in the hackathon and bring forth their creative ideas. The lighting of the lamp symbolized knowledge, innovation, and the bright future that this initiative envisions for young minds.",
      details: "The inauguration ceremony, led by Honourable Kanimozhi Karunanidhi, highlighted the vision of nurturing creativity and innovation among students. Her presence emphasized the importance of empowering young minds and set a strong foundation for the Sindhanai Sirpi Hackathon’s journey across six districts."
    },
    {
      image: "keethajevan lightson.jpg",
      title: "Honourable Geetha Jeevan Lights the Lamp at Sindhanai Sirpi Hackathon Inauguration",
      description: "As part of the inauguration ceremony of the Sindhanai Sirpi Hackathon, Geetha jeevan joined the dignitaries in lighting the traditional lamp. This symbolic gesture marked the beginning of an inspiring journey, fostering creativity, innovation, and collaboration among students.",
      details: "Honourable Geetha Jeevan's participation in the lamp lighting ceremony emphasized the collective commitment towards nurturing young innovators and encouraging them to bring forward impactful ideas."
    },

    {
      image: "radhakrishnan lightson.jpg",
      title: "Honourable Anitha Radhakrishnan Lights the Lamp at Sindhanai Sirpi Hackathon Inauguration",
      description: "During the inauguration ceremony of the Sindhanai Sirpi Hackathon, Anitha Radhakrishnan joined other dignitaries in lighting the traditional lamp. This momentous act marked the formal beginning of the event, symbolizing wisdom, knowledge, and the spirit of innovation that the hackathon stands for. His presence inspired participants to actively engage in the journey of creativity and problem-solving.",
      details: "Anitha Radhakrishnan’s participation in the lamp lighting ceremony reflected his commitment to nurturing student innovation and supporting the vision of the Sindhanai Sirpi Hackathon."
    },

    {
      image: "ilambagavath lightson.jpg",
      title: "Honourable Elambagavath Lights the Lamp at Sindhanai Sirpi Hackathon Inauguration",
      description: "As part of the inauguration ceremony of the Sindhanai Sirpi Hackathon, Elambagavath joined the distinguished guests in lighting the traditional lamp. This act symbolized the beginning of the event, spreading the message of wisdom, creativity, and innovation. His presence added value to the ceremony and inspired the participants to move forward with enthusiasm and dedication.",
      details: "Elambagavath’s participation in the lamp lighting ceremony highlighted his support towards empowering students and encouraging innovation."
    },
    {
      image: "ambalavanan lightson.jpg",
      title: "Honourable Ambalavanan IAAS Lights the Lamp at Sindhanai Sirpi Hackathon Inauguration",
      description: "During the inauguration of the Sindhanai Sirpi Hackathon, Ambalavanan IAAS joined other dignitaries in lighting the traditional lamp. This ceremonial gesture marked the auspicious start of the program, symbolizing knowledge, hope, and the spirit of innovation. His leadership and encouragement set the tone for a transformative journey, motivating students to participate actively.",
      details: "Ambalavanan IAAS’s involvement in the lamp lighting underscored his commitment to guiding young minds and supporting the mission of Sindhanai Sirpi Hackathon."
    },
    {
      image: "dpms.jpg",
      title: "DPM Meeting – Sindhanai Sirpi Hackathon",
      description: "The District Program Manager (DPM) meeting for the Sindhanai Sirpi Hackathon was conducted on 02/05/2025.In this meeting, the complete guidelines of the Sindhanai Sirpi Hackathon were explained in detail.The discussion covered the entire flow of the hackathon, from the initial launch to the final award ceremony.DPMs were guided on how to implement each stage effectively, ensuring smooth coordination across schools and districts.",
      details: "  "
    },

    {
      image: "principal-tvl.jpg",
      title: "Principal Meeting – Tirunelveli District",
      description: "The Sindhanai Sirpi Hackathon Principal Meeting for Tirunelveli district was successfully held on 09/09/2025.During the meeting, principals were provided with clear guidelines about the hackathon process. They were encouraged to join the official WhatsApp group for timely updates and communication. Additionally, principals were requested to ensure that their schools complete the registration form to actively participate in the Sindhanai Sirpi Hackathon.",
      details: ""
    }



  ];

  const handleImageClick = (item) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-16 sm:px-6 lg:px-8 max-w-8xl mx-auto"
    >
      <section className="relative bg-white p-0 rounded-3xl shadow-2xl overflow-hidden">
        <ImageSlider/>

        {/* Mirror Glass Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-end justify-center rounded-3xl">
          <h1 className="mb-6 text-white text-2xl sm:text-4xl font-extrabold tracking-wide drop-shadow-lg backdrop-blur-md px-6 py-3 rounded-xl">
            SINDHANAI SIRPI HACKATHON INAUGURATION CEREMONY

          </h1>
        </div>
      </section>


      {/* Featured Gallery Section */}
      <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-red-800 mb-4 drop-shadow">
          Featured Gallery
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 text-center mb-10">
          A sneak peek into the best moments of our Hackathon. Check out the creativity and teamwork in action!
        </p>

        <div className="space-y-10">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                } gap-8 items-center bg-gray-50 rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-500`}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleImageClick(item)}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2 h-full">
                <img
                  src={item.image}
                  loading="lazy"
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-semibold text-brown-700 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-base md:text-lg">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
