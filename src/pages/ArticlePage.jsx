import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArticlePage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/news-events');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        <button
          onClick={handleBack}
          className="m-6 md:m-10 flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        <div className="bg-white w-full min-h-[calc(100vh-7rem)] px-6 pb-12 pt-2 md:px-10 lg:px-16">
          <div className="mb-8 border-b border-gray-200 pb-6 max-w-6xl">
            <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
              Education
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-4 leading-tight">
              Medhavi Skills University Inaugurates Work Integrated ITI (CTS) programme under Flexi-MoU scheme of DGT
            </h1>
            <p className="text-gray-600 text-lg font-medium mb-4">
              Medhavi Skills University (MSU), Sikkim, in collaboration with RSB Transmissions, inaugurated the Work Integrated ITI (CTS) training programme under the Flexi-MoU scheme of DGT.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-semibold text-gray-800 mr-2">City Air News</span> |
              <span className="ml-2">Aug 28, 2023 08:35</span>
            </div>
          </div>

          <div className="mb-8 w-full">
            <img
              src="/news and event/image (1).png"
              alt="Inaugural Ceremony RSB Transmissions"
              className="h-[72vh] md:h-[78vh] w-full rounded-xl object-cover shadow-sm"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6 text-justify lg:pr-10">
            <p>
              <strong>Pune/Delhi, August 28, 2023:</strong> Medhavi Skills University (MSU), Sikkim, in collaboration with RSB Transmissions, inaugurated the work integrated ITI (CTS) training programme under the Flexi MoU scheme of DGT.
            </p>

            <p>
              It is important to mention that Medhavi Skills University has earlier signed an MoU with Directorate General of Training (DGT) to implement its Flexi MoU scheme as an Authorised Implementing University to offer on-the-job training based Flexible ITI (CTS) programme in partnership with various reputed Industries, where the students shall get ITI (CTS) Qualification certificate as well as practical work experience while deputed as trainees at the partner Industry premises.
            </p>

            <p>
              This Flexi MoU Scheme developed by the DGT, an apex regulatory body for ITIs, operating under the aegis of Ministry of Skill Development (MSDE), Government of India, is aimed to meet the demands of both industry and youths. It enables Industries to train candidates in accordance with the relevant skill sets sought by them, and it offers students a training environment that is in line with market demands and uses the most recent technology tools and machines.
            </p>

            <p>
              MSU has tied-up with RSB Transmissions, Pune, a reputed global Automotive manufacturing OEM company and has deputed 110 Flexi ITI Trainees as an inaugural batch.
            </p>

            <p>
              Abhay. A. Mahishi, Deputy Director, Regional Directorate of Skill Development and Entrepreneurship (RDSDE), Maharashtra, (DGT, MSDE) Government of India, was the Chief Guest at the event. On behalf of RSB Transmissions, Durga Prasanna Das, Plant Head, AGM - HR, Mukesh Kumar and Senior HR manager Parvati Nayak were present at the occasion. Also present was Mehboob Saiyyad, Managing Director at TalentCorp Solutions India, the candidate sourcing Staffing Partner for Medhavi Skills University.
            </p>

            <p>
              Medhavi Skills University was represented by Pravesh Dudani, Founder & Chancellor. Also present on behalf of Medhavi were, Sajeev Kumar S, Vice President, Industry Relations and Sitaram A. P., General Manager, Skill Integration and Certification.
            </p>

            <p>
              In his speech, the Chief Guest, Abhay. A. Mahishi, spoke about the background and benefits of Flexi MoU Programme under DGT. He emphasized on the fact that this programme is a unique model for students where they are able to continue with their education along with real-time hands-on experience in an industry, where they get an exposure on the latest technology, thus making them employment ready.
            </p>

            <p>
              Speaking at the inauguration, Pravesh Dudani, Founder & Chancellor, Medhavi Skills University, said: "The Flexi MoU Training Programme is a significant initiative by the MSU aimed at bridging the employability gap and fostering a well-trained workforce, as envisioned in the New Education Policy 2020. It is designed to offer flexible training options to enhance their technical skills and expertise along with sought after ITI CTS (NCVET) qualification."
            </p>

            <p>
              Durga Prasanna Das, Plant Head, RSB, in his speech emphasized that the trainees should be multi skilled and must gain hands on experience and would be provided with role rotation every quarter of the programme. He said that the students will also be provided with stipend as per Industry standards during the OJT period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
