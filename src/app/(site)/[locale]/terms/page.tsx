import { setRequestLocale } from 'next-intl/server';

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-[1000px] mx-auto px-3" style={{ color: 'white', textAlign: 'justify' }}>
        <h2 className="font-bold text-2xl md:text-3xl text-[#25C760] mb-2">
          <b>TERMS AND CONDITIONS</b>
        </h2>
        <p className="mb-6" style={{ fontFamily: 'Gilroy, sans-serif' }}>Last updated: 2025-11-04</p>

        {/* 1. Introduction */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">1. Introduction</h5>
          <p className="mb-2">Welcome to <strong>Mother Vegetable</strong> (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;)! These Terms of Service (&ldquo;Terms&rdquo;, &ldquo;Terms of Service&rdquo;) govern your use of our website located at <strong>https://www.mothervegetable.com</strong> (together or individually &ldquo;Service&rdquo;) operated by <strong>Mother Vegetable</strong>. Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.</p>
          <p className="mb-2">Your agreement with us includes these Terms and our Privacy Policy (&ldquo;Agreements&rdquo;). You acknowledge that you have read and understood Agreements, and agree to be bound of them.</p>
          <p className="mb-2">If you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at <strong>support@mothervegetable.com</strong> so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.</p>
        </div>

        {/* 2. Communications */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">2. Communications</h5>
          <p className="mb-2">By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at support@mothervegetable.com.</p>
        </div>

        {/* 3. Purchases */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">3. Purchases</h5>
          <p className="mb-2">If you wish to purchase any product or service made available through Service (&ldquo;Purchase&rdquo;), you may be asked to supply certain information relevant to your Purchase including but not limited to, your credit or debit card number, the expiration date of your card, your billing address, and your shipping information.</p>
          <p className="mb-2">You represent and warrant that: (i) you have the legal right to use any card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.</p>
          <p className="mb-2">We may employ the use of third party services for the purpose of facilitating payment and the completion of Purchases. By submitting your information, you grant us the right to provide the information to these third parties subject to our Privacy Policy.</p>
          <p className="mb-2">We reserve the right to refuse or cancel your order at any time for reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order or other reasons.</p>
          <p className="mb-2">We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected.</p>
        </div>

        {/* 4. Contests, Sweepstakes and Promotions */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">4. Contests, Sweepstakes and Promotions</h5>
          <p className="mb-2">Any contests, sweepstakes, or other promotions (collectively, &ldquo;Promotions&rdquo;) made available through Service may be governed by rules that are separate from these Terms of Service. If you participate in any Promotions, please review the applicable rules as well as our Privacy Policy. If the rules for a Promotion conflict with these Terms of Service, Promotion rules will apply.</p>
        </div>

        {/* 5. Subscriptions */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">5. Subscriptions</h5>
          <p className="mb-2">Some parts of Service are billed on a subscription basis (&quot;Subscription(s)&quot;). You will be billed in advance on a recurring and periodic basis (&quot;Billing Cycle&quot;). Billing cycles will be set depending on the type of subscription plan you select when purchasing a Subscription.</p>
          <p className="mb-2">At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or Mother Vegetable cancels it. You may cancel your Subscription renewal either through your online account management page or by contacting support@mothervegetable.com customer support team.</p>
          <p className="mb-2">A valid payment method is required to process the payment for your subscription. You shall provide Mother Vegetable with accurate and complete billing information that may include but not be limited to full name, address, state, postal or zip code, telephone number, and valid payment method information. By submitting such payment information, you automatically authorize Mother Vegetable to charge all Subscription fees incurred through your account to any such payment instruments.</p>
          <p className="mb-2">Should automatic billing fail to occur for any reason, Mother Vegetable reserves the right to terminate your access to the Service with immediate effect.</p>
        </div>

        {/* 6. Free Trial */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">6. Free Trial</h5>
          <p className="mb-2">Mother Vegetable may, at its sole discretion, offer a Subscription with a free trial for a limited period of time (&quot;Free Trial&quot;).</p>
          <p className="mb-2">You may be required to enter your billing information in order to sign up for Free Trial.</p>
          <p className="mb-2">If you do enter your billing information when signing up for Free Trial, you will not be charged by Mother Vegetable until Free Trial has expired. On the last day of the Free Trial period, unless you cancel your Subscription, you will be automatically charged the applicable Subscription fees for the type of Subscription you have selected.</p>
          <p className="mb-2">At any time and without notice, Mother Vegetable reserves the right to (i) modify Terms of Service of Free Trial offer, or (ii) cancel such Free Trial offer.</p>
        </div>

        {/* 7. Fee Changes */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">7. Fee Changes</h5>
          <p className="mb-2">Mother Vegetable, in its sole discretion and at any time, may modify Subscription fees for the Subscriptions. Any Subscription fee change will become effective at the end of the then-current Billing Cycle.</p>
          <p className="mb-2">Mother Vegetable will provide you with reasonable prior notice of any change in Subscription fees to give you an opportunity to terminate your Subscription before such change becomes effective.</p>
          <p className="mb-2">Your continued use of Service after Subscription fee change comes into effect constitutes your agreement to pay the modified Subscription fee amount.</p>
        </div>

        {/* 8. Refund Policy */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">8. Refund Policy</h5>
          <p className="mb-2">We strive to provide our customers with the best products and services. If you are not entirely satisfied with your purchase, we&rsquo;re here to help. Please read our refund policy carefully.</p>
          <div className="pl-4">
            <p className="font-bold mb-1">0.1 Returns:</p>
            <p className="mb-2">Eligibility: You have 14 days from the date of purchase to request a return. To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging. Certain items, such as perishable goods, personal care items, and digital products, are non-returnable.</p>
            <p className="mb-2">Proof of Purchase: A valid receipt or proof of purchase is required to process a return.</p>
            <p className="font-bold mb-1">0.2 Refunds:</p>
            <p className="mb-2">Process: Once we receive your returned item, we will inspect it and notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will be applied to your original method of payment within 14 business days.</p>
            <p className="mb-2">Partial Refunds: In some cases, only partial refunds are granted, such as for items that are not in their original condition, damaged, or missing parts for reasons not due to our error.</p>
            <p className="font-bold mb-1">0.3 Exchanges</p>
            <p className="mb-2">Product Exchange: We only replace items if they are defective or damaged. If you need to exchange it for the same item, please contact us at support@mothervegetable.com</p>
            <p className="font-bold mb-1">0.4 Shipping</p>
            <p className="mb-2">Return Shipping: You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
            <p className="mb-2">Shipping Damage: If the item was damaged during shipping, please contact us immediately so we can arrange a replacement.</p>
            <p className="font-bold mb-1">0.5 Non-Refundable Items</p>
            <p className="mb-2">Sale Items: Only regular-priced items may be refunded; unfortunately, sale items cannot be refunded.</p>
            <p className="mb-2">Custom Orders: Custom-made orders or personalized items are non-refundable unless they are defective or damaged.</p>
          </div>
        </div>

        {/* 9. Delivery Policy */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">9. Delivery Policy</h5>
          <p className="mb-2">We are committed to ensuring that your purchases reach you in a timely and secure manner. Please review our delivery policy for more information on shipping and handling.</p>
          <div className="pl-4">
            <p className="font-bold mb-1">0.1. Delivery Areas</p>
            <p className="mb-2">We deliver to all states and territories within Malaysia, including Peninsular Malaysia, Sabah, and Sarawak.</p>
            <p className="mb-2">International Deliveries: We also offer delivery to Australia using DHL. For other international destinations, please contact our customer service team for more information.</p>

            <p className="font-bold mb-1">0.2. Delivery Charges</p>
            <p className="mb-2">Peninsular Malaysia: Standard delivery charges apply based on the weight and dimensions of your order.</p>
            <p className="mb-2">Sabah and Sarawak: Additional delivery charges may apply due to the distance and logistics involved.</p>
            <p className="mb-2">Australia: Delivery charges for orders to Australia will be calculated at checkout based on the weight, dimensions, and destination of the package.</p>
            <p className="mb-2">Delivery charges will be calculated and displayed at checkout before you complete your purchase.</p>

            <p className="font-bold mb-1">0.3. Delivery Timeframes</p>
            <p className="mb-1 font-bold">Standard Delivery:</p>
            <p className="mb-1">Peninsular Malaysia: 3-5 business days.</p>
            <p className="mb-2">Sabah &amp; Sarawak: 5-7 business days.</p>
            <p className="mb-1 font-bold">Express Delivery (Where available):</p>
            <p className="mb-1">Peninsular Malaysia: 1-3 business days.</p>
            <p className="mb-2">Sabah &amp; Sarawak: 3-5 business days.</p>
            <p className="mb-2 pt-2">Australia Delivery: 5-14 business days, depending on the location and customs processing times.</p>
            <p className="mb-2">Orders placed on weekends or public holidays will be processed on the next business day.</p>
            <p className="mb-2">Delivery times are estimated and may vary based on external factors, such as public holidays, weather conditions, customs clearance, or courier partner delays.</p>

            <p className="font-bold mb-1">0.4. Order Processing</p>
            <p className="mb-2">Orders are processed within 1-2 business days upon receipt of payment.</p>
            <p className="mb-2">Once your order has been processed and shipped, you will receive a tracking number via email/SMS to monitor the delivery status.</p>

            <p className="font-bold mb-1">0.5. Delivery Partners</p>
            <p className="mb-2">We collaborate with reputable courier services, such as Pos Laju, NinjaVan, DHL, and others, to ensure your order is delivered promptly and securely.</p>
            <p className="mb-2">For deliveries to Australia, we use DHL to ensure reliable and timely international shipping.</p>

            <p className="font-bold mb-1">0.6. Delivery Issues</p>
            <p className="mb-2">If your order does not arrive within the expected timeframe, please contact our customer service team at support@mothervegetable.com.</p>
            <p className="mb-2">In the event of a lost or damaged parcel, we will work with the courier service to resolve the issue. Please notify us immediately if you receive a damaged package.</p>
            <p className="mb-2">We are not responsible for delays caused by courier services, customs, or other external factors beyond our control.</p>

            <p className="font-bold mb-1">0.7. Address Accuracy</p>
            <p className="mb-2">Please ensure that your delivery address is accurate and complete when placing your order. Any additional charges incurred due to incorrect or incomplete addresses will be the responsibility of the customer.</p>

            <p className="font-bold mb-1">0.8. Redelivery Charges</p>
            <p className="mb-2">If a delivery attempt is unsuccessful due to the recipient&rsquo;s unavailability, additional charges may apply for redelivery.</p>
          </div>
        </div>

        {/* 10. Content */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">10. Content</h5>
          <p className="mb-2">Content found on or through this Service are the property of Mother Vegetable or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.</p>
        </div>

        {/* 11. Prohibited Uses */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">11. Prohibited Uses</h5>
          <p className="mb-2">You may use Service only for lawful purposes and in accordance with Terms. You agree not to use Service:</p>
          <div className="pl-4">
            <p className="mb-1">0.1. In any way that violates any applicable national or international law or regulation.</p>
            <p className="mb-1">0.2. For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</p>
            <p className="mb-1">0.3. To transmit, or procure the sending of, any advertising or promotional material, including any &ldquo;junk mail&rdquo;, &ldquo;chain letter,&rdquo; &ldquo;spam,&rdquo; or any other similar solicitation.</p>
            <p className="mb-1">0.4. To impersonate or attempt to impersonate Company, a Company employee, another user, or any other person or entity.</p>
            <p className="mb-1">0.5. In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.</p>
            <p className="mb-2">0.6. To engage in any other conduct that restricts or inhibits anyone&rsquo;s use or enjoyment of Service, or which, as determined by us, may harm or offend Company or users of Service or expose them to liability.</p>
            <p className="mb-2">Additionally, you agree not to:</p>
            <p className="mb-1">0.1. Use Service in any manner that could disable, overburden, damage, or impair Service or interfere with any other party&rsquo;s use of Service, including their ability to engage in real-time activities through Service.</p>
            <p className="mb-1">0.2. Use any robot, spider, or other automatic device, process, or means to access Service for any purpose, including monitoring or copying any of the material on Service.</p>
            <p className="mb-1">0.3. Use any manual process to monitor or copy any of the material on Service or for any other unauthorized purpose without our prior written consent.</p>
            <p className="mb-1">0.4. Use any device, software, or routine that interferes with the proper working of Service.</p>
            <p className="mb-1">0.5. Introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful.</p>
            <p className="mb-1">0.6. Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of Service, the server on which Service is stored, or any server, computer, or database connected to Service.</p>
            <p className="mb-1">0.7. Attack Service via a denial-of-service attack or a distributed denial-of-service attack.</p>
            <p className="mb-1">0.8. Take any action that may damage or falsify Company rating.</p>
            <p className="mb-1">0.9. Otherwise attempt to interfere with the proper working of Service.</p>
          </div>
        </div>

        {/* 12. Analytics */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">12. Analytics</h5>
          <p className="mb-2">We may use third-party Service Providers to monitor and analyze the use of our Service.</p>
        </div>

        {/* 13. No Use By Minors */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">13. No Use By Minors</h5>
          <p className="mb-2">Service is intended only for access and use by individuals at least eighteen (18) years old. By accessing or using Service, you warrant and represent that you are at least eighteen (18) years of age and with the full authority, right, and capacity to enter into this agreement and abide by all of the terms and conditions of Terms. If you are not at least eighteen (18) years old, you are prohibited from both the access and usage of Service.</p>
        </div>

        {/* 14. Accounts */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">14. Accounts</h5>
          <p className="mb-2">When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on Service.</p>
          <p className="mb-2">You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
          <p className="mb-2">You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar, or obscene.</p>
          <p className="mb-2">We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion.</p>
        </div>

        {/* 15. Intellectual Property */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">15. Intellectual Property</h5>
          <p className="mb-2">Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Mother Vegetable and its licensors. Service is protected by copyright, trademark, and other laws of and foreign countries. Our trademarks may not be used in connection with any product or service without the prior written consent of Mother Vegetable.</p>
        </div>

        {/* 16. Copyright Policy */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">16. Copyright Policy</h5>
          <p className="mb-2">We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on Service infringes on the copyright or other intellectual property rights (&ldquo;Infringement&rdquo;) of any person or entity.</p>
          <p className="mb-2">If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to support@mothervegetable.com, with the subject line: &ldquo;Copyright Infringement&rdquo; and include in your claim a detailed description of the alleged Infringement as detailed below, under &ldquo;DMCA Notice and Procedure for Copyright Infringement Claims&rdquo;</p>
          <p className="mb-2">You may be held accountable for damages (including costs and attorneys&rsquo; fees) for misrepresentation or bad-faith claims on the infringement of any Content found on and/or through Service on your copyright.</p>
        </div>

        {/* 17. DMCA Notice */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">17. DMCA Notice and Procedure for Copyright Infringement Claims</h5>
          <p className="mb-2">You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the following information in writing (see 17 U.S.C 512(c)(3) for further detail):</p>
          <div className="pl-4">
            <p className="mb-1">0.1. an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright&rsquo;s interest;</p>
            <p className="mb-1">0.2. a description of the copyrighted work that you claim has been infringed, including the URL (i.e., web page address) of the location where the copyrighted work exists or a copy of the copyrighted work;</p>
            <p className="mb-1">0.3. identification of the URL or other specific location on Service where the material that you claim is infringing is located;</p>
            <p className="mb-1">0.4. your address, telephone number, and email address;</p>
            <p className="mb-1">0.5. a statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;</p>
            <p className="mb-1">0.6. a statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner&rsquo;s behalf.</p>
          </div>
        </div>

        {/* 18. Error Reporting and Feedback */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">18. Error Reporting and Feedback</h5>
          <p className="mb-2">You may provide us either directly at support@mothervegetable.com or via third party sites and tools with information and feedback concerning errors, suggestions for improvements, ideas, problems, complaints, and other matters related to our Service (&ldquo;Feedback&rdquo;).</p>
          <p className="mb-2">You acknowledge and agree that:</p>
          <div className="pl-4">
            <p className="mb-1">(i) you shall not retain, acquire or assert any intellectual property right or other right, title or interest in or to the Feedback;</p>
            <p className="mb-1">(ii) Company may have development ideas similar to the Feedback;</p>
            <p className="mb-1">(iii) Feedback does not contain confidential information or proprietary information from you or any third party; and</p>
            <p className="mb-1">(iv) Company is not under any obligation of confidentiality with respect to the Feedback. In the event the transfer of the ownership to the Feedback is not possible due to applicable mandatory laws, you grant Company and its affiliates an exclusive, transferable, irrevocable, free-of-charge, sub-licensable, unlimited and perpetual right to use (including copy, modify, create derivative works, publish, distribute and commercialize) Feedback in any manner and for any purpose.</p>
          </div>
        </div>

        {/* 19. Links To Other Web Sites */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">19. Links To Other Web Sites</h5>
          <p className="mb-2">Our Service may contain links to third party web sites or services that are not owned or controlled by Mother Vegetable.</p>
          <p className="mb-2">Mother Vegetable has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.</p>
          <p className="mb-2">YOU ACKNOWLEDGE AND AGREE THAT COMPANY SHALL NOT BE RESPONSIBLE OR LIABLE, DIRECTLY OR INDIRECTLY, FOR ANY DAMAGE OR LOSS CAUSED OR ALLEGED TO BE CAUSED BY OR IN CONNECTION WITH USE OF OR RELIANCE ON ANY SUCH CONTENT, GOODS OR SERVICES AVAILABLE ON OR THROUGH ANY SUCH THIRD PARTY WEB SITES OR SERVICES.</p>
          <p className="mb-2">WE STRONGLY ADVISE YOU TO READ THE TERMS OF SERVICE AND PRIVACY POLICIES OF ANY THIRD PARTY WEB SITES OR SERVICES THAT YOU VISIT.</p>
        </div>

        {/* 20. Disclaimer Of Warranty */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">20. Disclaimer Of Warranty</h5>
          <p className="mb-2">THESE SERVICES ARE PROVIDED BY COMPANY ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS. COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES, THEIR CONTENT, AND ANY SERVICES OR ITEMS OBTAINED FROM US IS AT YOUR SOLE RISK.</p>
          <p className="mb-2">NEITHER COMPANY NOR ANY PERSON ASSOCIATED WITH COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICES. WITHOUT LIMITING THE FOREGOING, NEITHER COMPANY NOR ANYONE ASSOCIATED WITH COMPANY REPRESENTS OR WARRANTS THAT THE SERVICES, THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT THE SERVICES OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE SERVICES OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.</p>
          <p className="mb-2">COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.</p>
          <p className="mb-2">THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.</p>
        </div>

        {/* 21. Limitation Of Liability */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">21. Limitation Of Liability</h5>
          <p className="mb-2">EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER IT ARISES (INCLUDING ATTORNEYS&rsquo; FEES AND ALL RELATED COSTS AND EXPENSES OF LITIGATION AND ARBITRATION, OR AT TRIAL OR ON APPEAL, IF ANY, WHETHER OR NOT LITIGATION OR ARBITRATION IS INSTITUTED), WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT, INCLUDING WITHOUT LIMITATION ANY CLAIM FOR PERSONAL INJURY OR PROPERTY DAMAGE, ARISING FROM THIS AGREEMENT AND ANY VIOLATION BY YOU OF ANY FEDERAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR REGULATIONS, EVEN IF COMPANY HAS BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE IS LIABILITY FOUND ON THE PART OF COMPANY, IT WILL BE LIMITED TO THE AMOUNT PAID FOR THE PRODUCTS AND/OR SERVICES, AND UNDER NO CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE DAMAGES. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF PUNITIVE, INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE PRIOR LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.</p>
        </div>

        {/* 22. Termination */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">22. Termination</h5>
          <p className="mb-2">We may terminate or suspend your account and bar access to Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of Terms.</p>
          <p className="mb-2">If you wish to terminate your account, you may simply discontinue using Service.</p>
          <p className="mb-2">All provisions of Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
        </div>

        {/* 23. Governing Law */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">23. Governing Law</h5>
          <p className="mb-2">These Terms shall be governed and construed in accordance with the laws of Malaysia, which governing law applies to agreement without regard to its conflict of law provisions.</p>
          <p className="mb-2">Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have had between us regarding Service.</p>
        </div>

        {/* 24. Changes To Service */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">24. Changes To Service</h5>
          <p className="mb-2">We reserve the right to withdraw or amend our Service, and any service or material we provide via Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of Service is unavailable at any time or for any period. From time to time, we may restrict access to some parts of Service, or the entire Service, to users, including registered users.</p>
        </div>

        {/* 25. Amendments To Terms */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">25. Amendments To Terms</h5>
          <p className="mb-2">We may amend Terms at any time by posting the amended terms on this site. It is your responsibility to review these Terms periodically.</p>
          <p className="mb-2">Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.</p>
          <p className="mb-2">By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use Service.</p>
        </div>

        {/* 26. Waiver And Severability */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">26. Waiver And Severability</h5>
          <p className="mb-2">No waiver by Company of any term or condition set forth in Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of Company to assert a right or provision under Terms shall not constitute a waiver of such right or provision.</p>
          <p className="mb-2">If any provision of Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of Terms will continue in full force and effect.</p>
        </div>

        {/* 27. Acknowledgement */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">27. Acknowledgement</h5>
          <p className="mb-2">BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.</p>
        </div>

        {/* 28. Contact Us */}
        <div className="py-3">
          <h5 className="font-bold text-lg text-[#25C760] mb-2">28. Contact Us</h5>
          <p className="mb-2">Please send your feedback, comments, requests for technical support by email: <strong>support@mothervegetable.com</strong></p>
        </div>
      </div>
    </div>
  );
}
