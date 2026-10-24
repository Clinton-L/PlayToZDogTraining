import puppyServicesImage from '../assets/PuppyServices-card.jpg'
import learnServicesImage from '../assets/Learn.jpg'
import growServicesImage from '../assets/Grow.jpg'
import thriveServicesImage from '../assets/RiffBoat.jpg'
import travelServicesImage from '../assets/JetInCar.jpg'

type ServiceContent = string | { item: string; description: string }

export type Service = {
  display: boolean
  title: string
  subtitle: string
  imageUrl: string
  imageAlt: string
  imagePosition?: string
  cost: string
  category?: 'logistics'
  details: {
    description?: string[]
    what?: {
      title?: string
      subtitle?: string
      content?: string
      list?: string[]
    }
    how?: {
      title?: string
      list?: ServiceContent[]
    }
  }
  closingNote?: {
    title?: string
    description?: string
    content?: string
  }
}

export const services = [
  {
    display: true,
    title: 'Begin - Puppy Foundations',
    subtitle:'A little guidance for the big adventure.',
    imageUrl: puppyServicesImage,
    imageAlt: 'Hawk, Kelpie cross playing on his bed with a toy in his mouth, looking up at the camera',
    imagePosition: '50% 50%',
    cost: '$495 (1 x 90 minute consultation + 3 x 45 minute follow up sessions)',
    details: {
      description: ['Bringing home a puppy is exciting, overwhelming and full of new experiences. Adding four feet to the family, along with all the cuddles come challenges, adventures and plenty of little wins.', '<b>BEGIN</b> is designed for puppies aged 8–16 weeks, helping you understand your puppy, build confidence and lay the foundations for the life you want to share together.'],
      what: {
        title: 'What we\'ll work on',
        subtitle: 'Every puppy and family is different, so we\'ll focus on what matters most to you. This might include:.',
        list: [
          '<b>Puppy essentials</b> — toileting, biting, settling and navigating everyday life.',
          '<b>Building confidence</b> — exploring new experiences and helping your puppy feel comfortable in the world.',
          '<b>Understanding your puppy</b> — learning how they communincate, what makes them tick and what they need as they grow.',
          '<b>Everyday skills</b> — getting started with recall, loose-lead walking and other useful liife skills.',
          '<b>Natural instincts</b> — discovering your puppy\'s individual needs and finding ways to work with their instincts, not against them.'
        ],
      },
      how: {
        title: 'How we\'ll work together',
        list: [
          {
            item:'Your first session will be a 90-minute consultation',
            description: 'We\'ll get to know you and your puppy, discuss your goals and create a plan tailored to your family.'
          },
          {
            item: 'Three follow up sessions (45 minutes each)',
            description: 'We\'ll build on your progress, navigate new challenges and adapt the plan as your puppy grows and develops.'
          }
        ]
      }
    },
    closingNote: {
      title: 'Growing together',
      description: 'Puppyhood is a lot.<br /> One minute you\'re wondering how something so cute can have so many teeth, and the next you\'re watching them discover the world for the first time.<br />We\'ll help you navigate the tricky bits while making space for the fun, too. You\'ll learn practical ways to guide your puppy, with simple things to try together between sessions.<br /> The goal isn\'t a perfect puppy. It\'s a dog you understand, a relationship you trust, and more joy in the life you share together.<br /><br /><b>Small wins today. More joy in the life you\'ll share tomorrow.</b>'
    }
  },
  {
    display: true,
    title: 'Learn - Initial Consultation',
    subtitle:'Every dog has a story. Let\'s start with yours',
    imageUrl:
      learnServicesImage,
    imageAlt: 'Jet, 14year old Kelpie cross, looking up at the camera',
    imagePosition: '50% 50%',
    cost: '$145 (1 x 90 minute session)',
    details: {
      description: ['Whether you\'re welcoming an older dog into the family, navigating everyday challenges or simply unsure where to start, we\'ll talk about your goals, what life looks like for your family and what you\'d like to achieve with your dog.'],
      what: {
        title: 'What we\'ll explore',
        subtitle: 'Every dog and family is different, so we\'ll focus on understanding what matters most to you.',
        list: [
          '<b>Your goals</b> — priorites and desired outcomes.',
          '<b>Your dog\'s</b> — individual needs and everyday challenges.',
          '<b>Practical skills</b> you\'d like to develop.',
          '<b>Right fit</b> - Whether Play to Z is the right fit for you and your dog.'
        ]
      },
      how: {}
    },
    closingNote: {
      title: 'Finding your way forward',
      content: 'You\'ll leave with a clearer idea of your goals, practical guidance on possible next steps and an understanding of how I may be able to help.<br />If your needs fall outside my experience or scope of practice, I\'ll be upfront about that and, where possible, help point you towards more appropriate support.<br />You don\'t need to have all the answers before we meet. We\'ll work out the best next step together.<br /><br /><b>Let\'s have a chat and see if Play to Z is the right fit.</b>'
    }
  },
  {
    display: true,
    title: 'Grow - Life Manners',
    subtitle:'Making everyday life a little easier.',
    imageUrl:
      growServicesImage,
    imageAlt: 'Nina, Mixed breed dog calm at home',
    imagePosition: '50% 55%',
    cost: '$285 (3 x 60 minute sessions) | $465 (5 x 60 minute sessions)',
    details: {
      description: ['From excitable greetings and jumping up to adolescent dogs with very strong opinions of their own, living with dogs can come with a few challenges.<br />GROW is about building the skills, habits and understanding that help your dog navigate everyday life — whether you\'re working through tricky behaviours, tackling the teenage rebellion or simply wanting a calmer, more connected life together.'],
      what: {
        title: 'What we\'ll work on',
        subtitle: 'Every dog and family is different, so we\'ll focus on what matters most to you.',
      },
      how: {
        title: 'This might include:',
        list: [
          '<b>Everyday manners</b> — greeting people politely, waiting at doors and keeping 4 paws on the floor.',
          '<b>Calmness and impulse control</b> — learning to pause, settle and manage excitement.',
          '<b>Adolescent challenges</b> — understanding changing behaviors, navigating teenage rebellion and building focus around distractions.',
          '<b>Natural instincts and energy</b> — finding positive ways to channel what makes your dog tick.',
          '<b>Life at home</b> — managing doorbell reactions, food manners and settling into family routines.',
          '<b>Building connection</b> — strengthening communication, encouraging positive play and developing independence while maintaining your bond.'
        ]
      }
    },
    closingNote: {
      title: 'Growing together',
      content: 'We\'ll build on your dog\'s existing skills and adapt our approach to suit their individual needs, stage of development and your family\'s lifestyle. You\'ll learn practical ways to guide your dog through everyday challenges, with simple things to try together between sessions.<br />Because the goal isn\'t a perfect dog. It\'s a home life that feels smoother, a relationship that grows stronger, and more joy in the little moments you share.<br /><br /><b>Because everyday life with your dog should feel good for both of you.</b>'
    }
  },
  {
    display: true,
    title: 'Thrive - Every Day Skills',
    subtitle:'Building skills for real life.',
    imageUrl:
      thriveServicesImage,
    imageAlt: 'Riff, Rhodesian Ridgeback, on a boat in the water, calm with his human.',
    imagePosition: '50% 70%',
    cost: '$225 (3 x 60 minute sessions) | $350 (5 x 60 minute sessions)',
    details: {
      description: ['From coming when called to walking nicely on lead, obedience skills can make everyday adventures safer, easier and more enjoyable.<br />THRIVE is about teaching your dog useful skills, building their understanding and helping you develop the confidence to guide them. We\'ll work at your dog\'s pace, focusing on what matters most to you and your life together.'],
      what: {
        title: 'What we\'ll work on',
        content: 'Every dog and family is different, so we\'ll tailor our sessions to your goals.'
      },
      how: {
        title: 'This might include:',
        list: [
          '<b>Everyday cues</b> — sit, drop, stay and wait',
          '<b>Recall</b> — building a stronger response when called',
          '<b>Loose-lead walking</b> — making walks more enjoyable for both ends of the lead',
          '<b>Walking skills</b> — developing lead handling, focus and engagement',
          '<b>Everyday safety skills</b>— practising useful skills to help navigate the world together',
          '<b>Working around distractions</b> — gradually building your dog\'s ability to respond in different environments',
        ]
      }
    },
    closingNote: {
      title: 'Progressing together',
      content: 'We\'ll break skills down into achievable steps, building on what your dog already knows and adapting as they progress. You\'ll learn how to communicate clearly, recognise what helps your dog succeed and practise these skills together between sessions.<br />The aim isn\'t simply to teach your dog a list of commands. It\'s to build understanding, confidence and skills you can use in everyday life.<br /><br /><b>Small steps, stronger skills and more adventures together.</b>'
    }
  },
  {
    display: false,
    title: 'Event Assistance',
    subtitle: 'Support for special occasions',
    imageUrl:
      'https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=720&q=80',
    imageAlt: 'Dogs spending time together outdoors',
    cost: '<b><i>*As this service is tailored to your needs, pricing will be discussed during your initial consultation.*</i></b>',
    details: {
      description: [
        'Get support travelling to and from a special event, with practice for the specific actions you need included in skills training.'
      ]
    }
  },
  {
    display: true,
    title: 'Travel & In-home Sessions',
    category: 'logistics',
    subtitle: 'Training that fits your life',
    imageUrl:
      travelServicesImage,
    imageAlt: 'Jet, 14 year old Kelpie cross, asleep in the back of a car, on a camping trip',
    imagePosition: '50% 100%',
    cost: '<b><i>see below</i></b>',
    details: {
      description: ['All sessions are held in your home, allowing us to work with your dog in the environment where everyday life happens.'],
      what: {},
      how: {
        title: 'Travel fees',
        list: [
          { item: 'Within 10 km', description: 'Travel within 10 km of the trainer\'s location is included in the session cost.' },
          { item: '10–20 km', description: 'A travel fee of $15 per appointment applies for travel between 10 and 20 km.' },
          { item: '20–30 km', description: 'A travel fee of $25 per appointment applies for travel between 20 and 30 km.' },
          { item: '30+ km', description: 'For travel beyond 30 km, a travel fee will be discussed before confirming your initial consultation.' },
          '<i>Not sure if you\'re in my service area? Get in touch and we\'ll work it out!</i>'
        ]
      }
    },
    closingNote: {
      title: 'Is Play To Z the right fit for you?',
      content: 'Every dog and family is different. If your goals or your dog\'s needs fall outside my experience, I\'ll be upfront about that and, where possible, help you find appropriate support.<br />Not sure where to start? <b>Get in touch and let\'s have a chat.</b>'
    }
  }
] satisfies Service[]
