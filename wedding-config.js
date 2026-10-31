/**
 * WEDDING INVITATION CONFIGURATION
 * All wedding details, couple information, events, story timeline, and gallery items
 * can be easily updated and customized in this single file.
 */

const WEDDING_CONFIG = {
  // =========================================================================
  // MULTILINGUAL CONTENT CONFIGURATION (ENGLISH & HINDI)
  // Edit the text below to change what appears in English and Hindi on the site.
  // =========================================================================
  translations: {
    // English Version Data
    en: {
      btnLabel: "अ",
      btnTitle: "हिंदी में देखें / View in Hindi",
      scrollHint: "Scroll to Unveil",
      tapToOpen: "TAP TO OPEN",
      tapToScroll: "SCROLL",
      bride: {
        name: "Muskan",
        kinship: "Daughter of",
        parents: "Mrs. Annu Prasad & Mr. Uday Shankar Prasad"
      },
      groom: {
        name: "Krishna",
        kinship: "Son of",
        parents: "Mrs. Kalyani Bid & Mr. Sukumar Bid"
      },

      countdown: {
        days: "Days",
        hours: "Hours",
        mins: "Mins",
        secs: "Secs"
      },
      eventsSection: {
        subtitle: "SACRED WEDDING CELEBRATIONS",
        title: "Auspicious Ceremonies",
        scrollHint: "Swipe or Scroll to Explore Ceremonies",
        btnMap: "View Venue",
        btnCalendar: "Add to Calendar",
        dressCodeLabel: "Attire",
        events: [
          {
            id: "haldi",
            badge: "CEREMONY 01",
            name: "Haldi Ceremony",
            tagline: "Ubtan, Laughter & Golden Sunshine",
            date: "Tuesday, 24th November 2026",
            time: "10:00 AM - 01:00 PM",
            venue: "Aditya Banquet, Hirak Road, Dhanbad",
            dressCode: "Festive Yellow",
            description: "An auspicious morning bathed in golden turmeric pastes, fragrant marigold showers, and joyful family banter."
          },
          {
            id: "mehendi",
            badge: "CEREMONY 02",
            name: "Mehendi & High Tea",
            tagline: "Intricate Henna, Folk Rhythms & Royal Flavors",
            date: "Tuesday, 24th November 2026",
            time: "04:00 PM - 07:30 PM",
            venue: "Aditya Banquet, Hirak Road, Dhanbad",
            dressCode: "Emerald Green & Floral",
            description: "Adorning hands with exquisite fragrant henna motifs, live folk rhythms, and lavish Rajasthani high-tea delicacies."
          },
          {
            id: "sangeet",
            badge: "CEREMONY 03",
            name: "Sangeet Night",
            tagline: "A Symphony of Beats, Glitz & Grand Performances",
            date: "Tuesday, 24th November 2026",
            time: "08:00 PM Onwards",
            venue: "Sangli Resort, Dhanbad",
            dressCode: "Glamorous Indo-Western",
            description: "An electrifying musical extravaganza featuring breathtaking family dance performances, DJ beats, and gourmet dining."
          },
          {
            id: "barat",
            badge: "CEREMONY 04",
            name: "Baraat & Shubh Vivah",
            tagline: "The Wedding & Sacred 7 Pheras",
            date: "Wednesday, 25th November 2026",
            time: "Varmala 09:30 PM",
            venue: "Sangli Resort Mandap, Dhanbad",
            dressCode: "Traditional",
            description: "The grand Baraat procession, garland exchange under floral showers, and the eternal 7 vows around the holy Agni."
          },
          {
            id: "DINNER",
            badge: "CEREMONY 05",
            name: "DINNER",
            tagline: "An Evening of Feast & Blessings",
            date: "Wednesday, 25th November 2026",
            time: "07:30 PM Onwards",
            venue: "Sangli Resort Banquet, Dhanbad",
            description: "A majestic dinner celebrating the newlyweds with live classical melodies and grand Indian hospitality."
          }
        ]
      },
      familyBlessings: {
        sanskritTag: "॥ पारिवारिक शुभाशीर्वाद ॥",
        title: "FAMILY BLESSINGS",
        subtitle: "With the Love & Blessings of Our Families",
        quote: "“We cordially invite you and your family to grace the auspicious wedding ceremonies of our beloved son and bestow your heartfelt blessings upon the bride and groom as they embark on their sacred journey of love and togetherness.”",
        brideFamily: {
          title: "THE BID FAMILY",
          badge: "GROOM'S FAMILY",
          ancestorLabel: "",
          ancestors: "",
          parentsLabel: "PARENTS",
          parents: "Mrs. Kalyani Bid & Mr. Sukumar Bid"
        },
        gratitudeLabel: "दर्शनाभिलाषी:",
        gratitudeVal: "Entire Bid Family"
      }
    },

    // Hindi Version Data (हिंदी संस्करण)
    hi: {
      btnLabel: "EN",
      btnTitle: "View in English / अंग्रेजी में देखें",
      scrollHint: "दर्शन हेतु स्क्रॉल करें",
      tapToOpen: "द्वार खोलें",
      tapToScroll: "स्क्रॉल",
      bride: {
        name: "कुमारी मुस्कान",
        kinship: "सुपुत्री",
        parents: "श्रीमती अन्नू प्रसाद एवं श्री उदय शंकर प्रसाद"
      },
      groom: {
        name: "कृष्ण कुमार",
        kinship: "सुपुत्र",
        parents: "श्रीमती कल्याणी बिद एवं श्री सुकुमार बिद"
      },

      countdown: {
        days: "दिन",
        hours: "घंटे",
        mins: "मिनट",
        secs: "सेकंड"
      },
      eventsSection: {
        subtitle: "॥ मांगलिक वैवाहिक उत्सव ॥",
        title: "शुभ विवाह कार्यक्रम",
        scrollHint: "कार्यक्रम देखने हेतु स्क्रॉल अथवा स्वाइप करें",
        btnMap: "स्थान देखें",
        btnCalendar: "कैलेंडर में जोड़ें",
        dressCodeLabel: "पहनावा",
        events: [
          {
            id: "haldi",
            badge: "कार्यक्रम ०१",
            name: "हल्दी उत्सव",
            tagline: "उबटन, हंसी-उल्लास एवं पीत आभा",
            date: "मंगलवार, २४ नवंबर २०२६",
            time: "प्रातः १०:०० बजे से अपराह्न ०१:०० बजे तक",
            venue: "आदित्य बैंक्वेट हॉल, हीरक रोड, धनबाद",
            dressCode: "पीला एवं सूर्यमुखी परिधान",
            description: "पवित्र हल्दी, गेंदे के पुष्पों की वर्षा और परिजनों के स्नेह के साथ मंगलमय हल्दी का उत्सव।"
          },
          {
            id: "mehendi",
            badge: "कार्यक्रम ०२",
            name: "मेहंदी एवं हाई टी",
            tagline: "सुगंधित हिना, लोक संगीत एवं उल्लास",
            date: "मंगलवार, २४ नवंबर २०२६",
            time: "अपराह्न ०४:०० बजे से सायं ०७:३० बजे तक",
            venue: "आदित्य बैंक्वेट हॉल, हीरक रोड, धनबाद",
            dressCode: "हरा एवं फ्लोरल परिधान",
            description: "हाथों में रचेगी सगुन की मेहंदी, पारंपरिक लोकगीतों की गूंज और स्वादिष्ट व्यंजनों का आनंद।"
          },
          {
            id: "sangeet",
            badge: "कार्यक्रम ०३",
            name: "शाही संगीत निशा",
            tagline: "सुर, ताल और नृत्य का भव्य संगम",
            date: "मंगलवार, २४ नवंबर २०२६",
            time: "रात्रि ०८:०० बजे से",
            venue: "सांगली रिसॉर्ट, धनबाद",
            dressCode: "इंडो-वेस्टर्न एवं चमकीले परिधान",
            description: "पारिवारिक मनमोहक नृत्य प्रस्तुतियां, डीजे की धुनें और भव्य शाही रात्रिभोज।"
          },
          {
            id: "barat",
            badge: "कार्यक्रम ०४",
            name: "बारात एवं शुभ विवाह",
            tagline: "वरयात्रा, वरमाला एवं पवित्र सप्तपदी",
            date: "बुधवार, २५ नवंबर २०२६",
            time: "बारात: सायं ०४:३० | वरमाला: ०६:३० | फेरे: ०७:१५",
            venue: "सांगली रिसॉर्ट, जिओ पेट्रोल पंप के पास, धनबाद",
            dressCode: "पारंपरिक शाही (लाल, महरून, आइवरी व सुनहरा)",
            description: "भव्य बारात का आगमन, वरमाला एवं पवित्र अग्नि के साक्षी में जीवन भर साथ निभाने के सात फेरे।"
          },
          {
            id: "DINNER",
            badge: "कार्यक्रम ०५",
            name: "भव्य प्रीतिभोज एवं डिनर",
            tagline: "स्नेह मिलन, आशीर्वाद एवं उत्सव",
            date: "बुधवार, २५ नवंबर २०२६",
            time: "सायं ०७:३० बजे से",
            venue: "सांगली रिसॉर्ट, जिओ पेट्रोल पंप के पास, धनबाद",
            description: "नवदंपति के स्वागत में भव्य प्रीतिभोज, संगीत एवं परिजनों का मंगल आशीर्वाद।"
          }
        ]
      },
      familyBlessings: {
        sanskritTag: "॥ पारिवारिक शुभाशीर्वाद ॥",
        title: "पारिवारिक शुभाशीर्वाद",
        subtitle: "समस्त परिवार के स्नेह एवं मंगल आशीर्वाद सहित",
        quote: "“हम आप सभी को सपरिवार अपने प्रिय सुपुत्र के मांगलिक वैवाहिक उत्सव में सादर आमंत्रित करते हैं। वर-वधू को अपने स्नेहिल आशीष से अनुगृहीत कर इस पावन बेला की शोभा बढ़ाएं।”",
        brideFamily: {
          title: "बिद परिवार",
          badge: "वर पक्ष",
          ancestorLabel: "",
          ancestors: "",
          parentsLabel: "माता-पिता",
          parents: "श्रीमती कल्याणी बिद एवं श्री सुकुमार बिद"
        },
        gratitudeLabel: "दर्शनाभिलाषी:",
        gratitudeVal: "समस्त बिद परिवार"
      }
    }
  },

  // Couple Information
  couple: {
    groom: {
      firstName: "Krishna",
      lastName: "Kumar",
      fullName: "Krishna Kumar",
      title: " Groom",
      parents: "Son of Mrs. Kalyani Bid & Mr. Sukumar Bid",
      grandparents: "Grandson of Late Mrs. Kamala & Late Mr. Govind Singhania",
      bio: "An architect with a passion for heritage design and classical music, Krishna brings warmth, creativity, and steadfast love to every moment.",
      photo: "assets/images/groom_portrait.jpg",
      instagram: "krishna_singhania"
    },
    bride: {
      firstName: "Kuamri",
      lastName: "Muskan",
      fullName: "Muskan Kapoor",
      title: " Bride",
      parents: "Daughter of Mrs. ANNU PRASAD & Mr. UDAY SHANKAR PRASAD ",
      grandparents: "Granddaughter of LATE KAMINI DEVI & Late SHEO NANDAN PRASAD",
      bio: "An artistic soul and classical dancer with a radiant smile, Muskan turns every ordinary day into an extraordinary celebration of joy and grace.",
      photo: "assets/images/bride_portrait.jpg",
      instagram: "muskan_kapoor"
    },
    heroImage: "assets/images/couple_hero.jpg",
    hashtag: "#KrishnaKiMuskan",
    tagline: "Two Souls, One Royal Journey of Eternal Love",
    storyQuote: "In the sacred rhythm of destiny, two hearts beat together in unison to embark on the timeless voyage of togetherness."
  },

  // Background Music / Song Settings
  // Place your .mp3 / audio file in assets/audio/ or put an online audio URL
  // If audioUrl is empty or not found, it automatically plays the Royal Shehnai synthesizer
  music: {
    enabled: true,
    audioUrl: "assets/audio/AUD-20260928-WA0008.mp3",
    title: "Play Music",
    playingTitle: "Pause Music",
    volume: 0.8,
    loop: true
  },

  // Auspicious Dates & Countdown Target
  weddingDate: {
    displayDate: "Wednesday, 25th November 2026",
    displayTime: "07:00 PM Onwards (Shubh Muhurat)",
    targetIso: "2026-11-25T19:00:00+05:30", // For dynamic countdown
    muhurat: "Godhuli Bela | 07:15 PM to 09:30 PM",
    city: "Dhanbad, Jharkhand, India"
  },

  // Auspicious Shlokas & Blessings
  shlokas: [
    {
      sanskrit: "॥ श्री गणेशाय नमः ॥",
      transliteration: "Shree Ganeshay Namah",
      meaning: "Salutations to Lord Ganesha, the remover of obstacles and harbinger of auspicious beginnings."
    },
    {
      sanskrit: "मंगलम् भगवान विष्णुः मंगलम् गरुडध्वजः ।\nमंगलम् पुण्डरीकाक्षो मङ्गलाय तनो हरिः ॥",
      transliteration: "Mangalam Bhagwan Vishnuh, Mangalam Garudadhwajah",
      meaning: "May the divine grace of Lord Vishnu bestow eternal auspiciousness, peace, and prospering love."
    },
    {
      sanskrit: "धर्मे च अर्थे च कामे च नातिचरामि ॥",
      transliteration: "Dharme cha Arthe cha Kaame cha Naaticharaami",
      meaning: "In righteousness, in prosperity, and in love, I shall forever walk with you hand in hand."
    }
  ],

  // Wedding Events / Functions
  events: [
    {
      id: "haldi",
      name: "Haldi Ceremony",
      tagline: "Ubtan, Laughter & Golden Glow",
      date: "Tuesday, 24th December 2026",
      time: "10:00 AM - 01:00 PM",
      venue: "Aditya Banquet Hall, Hirak Road, Dhanbad",
      address: "Aditya Banquet Hall, Hirak Road, Dhanbad",
      dressCode: "Festive Yellow & Sunshine Pastels",
      description: "An auspicious morning bathed in golden turmeric pastes, marigold showers, fragrant rosewater, and joyful family banter.",
      icon: "sun",
      themeColor: "#E5A93B",
      googleMapsUrl: "https://maps.google.com/?q=Aditya+Banquet+Hall+Hirak+Road+Dhanbad",
      calendarData: {
        title: "Haldi Ceremony - Krishna & Muskan Wedding",
        start: "20261124T100000",
        end: "20261124T130000",
        location: "Aditya Banquet, Hirak Road, Dhanbad"
      }
    },
    {
      id: "mehendi",
      name: "Mehendi & High Tea",
      tagline: "Intricate Henna, Folk Rhythms & Royal Flavors",
      date: "Tuesday, 24th November 2026",
      time: "04:00 PM - 07:30 PM",
      venue: "Aditya Banquet Hall, Hirak Road, Dhanbad",
      address: "Aditya Banquet Hall, Hirak Road, Dhanbad",
      dressCode: "Emerald Green, Mint & Floral Attire",
      description: "Adorning hands with exquisite fragrant henna motifs, live folk musicians, bangles stall, and lavish Rajasthani high-tea delicacies.",
      icon: "flower",
      themeColor: "#2D7F5E",
      googleMapsUrl: "https://maps.google.com/?q=Aditya+Banquet+Hall+Hirak+Road+Dhanbad",
      calendarData: {
        title: "Mehendi Ceremony - Krishna & Muskan Wedding",
        start: "20261124T160000",
        end: "20261124T193000",
        location: "Aditya Banquet Hall, Hirak Road, Dhanbad"
      }
    },
    {
      id: "sangeet",
      name: "Royal Sangeet Night",
      tagline: "A Symphony of Beats, Glitz & Grand Performances",
      date: "Tuesday, 24th November 2026",
      time: "08:00 PM Onwards",
      venue: "Sangli Resort, Dhanbad",
      address: "Sangli Resort, Dhanbad",
      dressCode: "Glamorous Indowestern & Sparkly Lehengas",
      description: "An electrifying musical extravaganza featuring breathtaking family dance performances, DJ beats, signature royal cocktails, and gourmet dining.",
      icon: "music",
      themeColor: "#8B2671",
      googleMapsUrl: "https://maps.google.com/?q=Sangli+Resort+Dhanbad+Jharkhand",
      calendarData: {
        title: "Royal Sangeet - Krishna & Muskan Wedding",
        start: "20261124T200000",
        end: "20261125T010000",
        location: "Sangli Resort, Dhanbad"
      }
    },
    {
      id: "wedding",
      name: "Varmala & Pheras",
      tagline: "The Wedding Ceremony",
      date: "Wednesday, 25th November 2026",
      time: "Varmala 09:30 PM | Pheras 02:30 AM",
      venue: "Sangli Resort Mandap, Dhanbad",
      address: "Sangli Resort, Near JIO Petrol PUMP, DHANBAD",
      dressCode: "Royal Traditional (Ivory, Crimson, Maroons & Gold)",
      description: "The royal royal procession by royal boats, the garland exchange under floral fireworks, and the sacred 7 vows around the holy Agni.",
      icon: "sparkles",
      themeColor: "#8B1E2D",
      googleMapsUrl: "https://maps.google.com/?q=Jagmandir+Island+Palace+Udaipur",
      calendarData: {
        title: "Wedding Ceremony (Pheras) - Krishna & Muskan",
        start: "20261125T163000",
        end: "20261125T230000",
        location: "Sangli Resort Mandap, Dhanbad"
      }
    },
    {
      id: "DINNER",
      name: "DINNER",
      tagline: "An Evening of  Feast, Toasts & Celebrations",
      date: "Sunday, 25th November 2026",
      time: "07:30 PM Onwards",
      venue: "Sangli Resort Banquet, Dhanbad",
      address: "Sangli Resort, Near JIO Petrol PUMP, DHANBAD",
      description: "A majestic imperial banquet welcoming the newlyweds with candlelit crystal chandeliers, live symphony orchestra, and royal Rajasthani hospitality.",
      icon: "crown",
      themeColor: "#C59B27",
      googleMapsUrl: "https://maps.google.com/?q=City+Palace+Udaipur",
      calendarData: {
        title: "Grand DINNER - Krishna & Muskan",
        start: "20261213T193000",
        end: "20261213T235900",
        location: "Sangli Resort Banquet, Dhanbad"
      }
    }
  ],

  // Love Story Timeline
  storyTimeline: [
    {
      year: "November 2022",
      title: "The Serendipitous Encounter",
      location: "Jaipur Literature & Arts Pavilion",
      description: "Across an ornate pavilion courtyard surrounded by havelis, a chance conversation over artisan Chai ignited an instant intellectual and soulful spark."
    },
    {
      year: "August 2023",
      title: "First Unforgettable Date",
      location: "Amber Fort Hilltop Cafe",
      description: "Under starry Rajasthan skies overlooking lit palace ramparts, hours vanished like seconds as they discovered shared dreams, music, and eternal ideals."
    },
    {
      year: "October 2024",
      title: "The Royal Sunset Proposal",
      location: "Lake Pichola Private Shikara",
      description: "As the sun set into shades of molten gold and amber over the lake, Krishna went down on one knee with an heirloom ring and asked the forever question."
    },
    {
      year: "February 2025",
      title: "Roka & Family Blessings",
      location: "Heritage Haveli, New Delhi",
      description: "Two venerable families united in laughter and sweets, sealing the auspicious bond of marriage with Vedic shlokas, warmth, and golden sweets."
    },
    {
      year: "December 2026",
      title: "Forever Begins Now",
      location: "Jagmandir Island Palace, Udaipur",
      description: "Taking the sacred 7 pheras around the holy fire, stepping hand-in-hand into a lifetime of cherished memories, shared journeys, and endless love."
    }
  ],

  // Photo Gallery
  gallery: [
    {
      src: "assets/images/couple_hero.jpg",
      caption: "Our Royal Pre-Wedding Portrait in Udaivilas Courtyard",
      category: "Pre-Wedding"
    },
    {
      src: "assets/images/gallery_prewedding.jpg",
      caption: "Golden Hour Stroll along the Palace Fountains",
      category: "Moments"
    },
    {
      src: "assets/images/bride_portrait.jpg",
      caption: "Muskan in her Royal Zardozi Bridal Finery",
      category: "Bridal"
    },
    {
      src: "assets/images/groom_portrait.jpg",
      caption: "Krishna in Imperial Ivory Sherwani with Emeralds",
      category: "Groom"
    },
    {
      src: "assets/images/gallery_mehendi.jpg",
      caption: "Joyous Mehendi Beats & Festive Marigold Laughter",
      category: "Festivities"
    },
    {
      src: "assets/images/gallery_mandap.jpg",
      caption: "The Enchanting Lakeside Floral Mandap Setup",
      category: "Decor"
    }
  ],

  // Family Lineage & Warm Welcomes
  families: {
    groomSide: {
      familyName: "The Singhania Family",
      title: "Groom's Family",
      elders: "With the loving blessings of Late Mrs. Kamala & Late Mr. Govind Singhania",
      parents: "Mrs. Kalyani Bid & Mr. Sukumar Bid",
      siblings: "Rohan & Meera Singhania (Brother & Sister-in-law)",
      relatives: "All near and dear members of the Singhania & Verma families"
    },
    brideSide: {
      familyName: "The Kapoor Family",
      title: "Bride's Family",
      elders: "With the pious blessings of Mrs. Shakuntala & Late Mr. Harish Kapoor",
      parents: "Mrs. Vandana & Mr. Mahendra Kapoor",
      siblings: "Kabir Kapoor (Brother)",
      relatives: "All near and dear members of the Kapoor & Malhotra families"
    },
    message: "We cordially invite you and your family to grace the auspicious wedding ceremonies of our beloved daughter and bestow your heartfelt blessings upon the bride and groom as they embark on their sacred journey of love and togetherness."
  },

  // Venue & Travel Information
  travelInfo: {
    airport: "Maharana Pratap Airport (UDR), Udaipur - 45 mins drive",
    railway: "Udaipur City Railway Station (UDZ) - 20 mins drive",
    hotelDesk: "Concierge & Guest Hospitality Desk available 24/7 at Udaivilas Lobby",
    contacts: [
      { name: "Rajesh Singhania (Guest Relations)", phone: "+91 98765 43210" },
      { name: "Vikram Kapoor (Logistics & Travel)", phone: "+91 98123 45678" }
    ]
  },

  // Default wishes for the live guestbook wall
  initialWishes: [
    {
      name: "Uncle Ramesh & Aarti Aunty",
      relation: "Family",
      message: "Wishing dearest Krishna & Muskan a lifetime filled with immense joy, prosperity, mutual respect, and unconditional love! God bless you both.",
      time: "2 hours ago"
    },
    {
      name: "Pooja & Siddharth",
      relation: "College Friends",
      message: "From college canteen debates to your royal wedding in Udaipur, what an incredible journey! Can't wait to dance our hearts out at the Sangeet!",
      time: "5 hours ago"
    },
    {
      name: "Dr. N. K. Malhotra",
      relation: "Family Well-wisher",
      message: "Heartiest congratulations to the Kapoor and Singhania families. May the Almighty shower everlasting happiness on the divine couple.",
      time: "1 day ago"
    }
  ]
};

// Export or expose globally
if (typeof module !== "undefined" && module.exports) {
  module.exports = WEDDING_CONFIG;
}
