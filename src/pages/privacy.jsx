import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const usageList = [
  'Provide, operate, and maintain our website',
  'Improve, personalize, and expand our website',
  'Understand and analyze how you use our website',
  'Develop new products, services, features, and functionality',
  'Communicate with you, either directly or through one of our partners, including for customer service, updates and other information relating to the website, and for marketing and promotional purposes',
  'Send you emails',
  'Find and prevent fraud',
];

const ccpaList = [
  "Request that a business that collects a consumer's data disclose the categories and specific pieces of personal data that a business has collected about consumers.",
  'Request that a business deletes any personal data about the consumer that a business has collected.',
  "Request that a business that sells a consumer's data, not sell the consumer's data.",
];

const gdprList = [
  'Right to access — You have the right to request copies of your personal data. We may charge you a small fee for this service.',
  'Right to rectification — You have the right to request that we correct any information you believe is inaccurate.',
  'Right to erasure — You have the right to request that we erase your personal data, under certain conditions.',
  'Right to restrict processing — You have the right to request that we restrict the processing of your personal data, under certain conditions.',
  'Right to object to processing — You have the right to object to our processing of your personal data, under certain conditions.',
  'Right to data portability — You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.',
];

const sections = [
  {
    title: '1. Consent',
    body: ['By using our website, you hereby consent to our Privacy Policy and agree to its terms.'],
  },
  {
    title: '2. Information We Collect',
    body: [
      'The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.',
      'If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.',
      'When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.',
    ],
  },
  {
    title: '3. How We Use Your Information',
    body: ['We use the information we collect in various ways, including to:'],
    list: usageList,
  },
  {
    title: '4. Log Files',
    body: [
      'TSPL Group follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any personally identifiable information. The purpose of the information is for analyzing trends, administering the site, and gathering demographic information.',
    ],
  },
  {
    title: '5. Cookies and Web Beacons',
    body: [
      'Like any other website, TSPL Group uses "cookies". These cookies are used to store information including visitors\' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users\' experience by customizing our web page content based on visitors\' browser type and/or other information.',
    ],
  },
  {
    title: '6. Advertising Partners Privacy Policies',
    body: [
      "Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on TSPL Group, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.",
      'Note that TSPL Group has no access to or control over these cookies that are used by third-party advertisers.',
    ],
  },
  {
    title: '7. Third-Party Privacy Policies',
    body: [
      "TSPL Group's Privacy Policy does not apply to other advertisers or websites. We advise you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. You can choose to disable cookies through your individual browser options.",
    ],
  },
  {
    title: '8. CCPA Privacy Rights',
    body: ['Under the CCPA, among other rights, California consumers have the right to:'],
    list: ccpaList,
    afterList:
      'If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.',
  },
  {
    title: '9. GDPR Data Protection Rights',
    body: ['Every user is entitled to the following rights:'],
    list: gdprList,
    afterList:
      'If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.',
  },
  {
    title: "10. Children's Information",
    body: [
      'Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.',
      'TSPL Group does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.',
    ],
  },
  {
    title: '11. Applicable Law & Jurisdiction',
    body: [
      'By visiting this Platform, you agree that the laws of the Republic of India, without regard to its conflict of laws principles, govern this Privacy Policy, and any dispute arising in respect hereof shall be subject to and governed by the dispute resolution process set out in the Terms & Conditions.',
    ],
  },
  {
    title: '12. Security',
    body: [
      'Our top priority is the security and confidentiality of our customers. We try as much as possible to write clean code and perform thorough testing. Despite our best efforts, vulnerabilities may still be present in our services. TSPL Group will make the best effort to respond as fast as possible to any security issues reported.',
      'We take the security of our systems seriously. If you found a vulnerability, please email us at admin@tsplgroup.in.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-8 lg:px-10">
        <header className="mb-10 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-slate-300">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1a4a8a] sm:text-4xl">
            Privacy Policy
          </h1>
          <div className="mt-4 space-y-3 text-slate-700 leading-7">
            <p>
              TSPL Group, which offers skilling and staffing services, accessible from{' '}
              <a href="https://tsplgroup.in" className="text-[#1a4a8a] font-semibold transition-colors duration-200 hover:text-blue-800 hover:underline">
                https://tsplgroup.in
              </a>{' '}
              and our mobile application. One of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by TSPL Group and how we use it.
            </p>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us via the contact form or at{' '}
              <a href="mailto:admin@tsplgroup.in" className="text-[#1a4a8a] font-semibold transition-colors duration-200 hover:text-blue-800 hover:underline">
                admin@tsplgroup.in
              </a>
              .
            </p>
          </div>
        </header>

        <div className="space-y-6">
          {sections.map((section) => (
            <section 
              key={section.title} 
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-slate-300"
            >
              <h2 className="text-xl font-bold text-[#1a4a8a]">{section.title}</h2>
              
              {section.body.map((paragraph, index) => (
                <p key={index} className="mt-3 leading-7 text-slate-700">
                  {paragraph}
                </p>
              ))}

              {section.list && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                  {section.list.map((item, index) => (
                    <li key={index}>
                      {item.includes(' — ') ? (
                        <>
                          <strong>{item.split(' — ')[0]}</strong> — {item.split(' — ')[1]}
                        </>
                      ) : (
                        item
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {section.afterList && (
                <p className="mt-4 leading-7 text-slate-700">{section.afterList}</p>
              )}
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}