/* Stylesheet imports */
import styles from '../about-page.module.css';

/* Imports from other components created */
import Page from '../../../components/kebab-page/kebab-page';

/**
 * Constructs and returns the Policy page.
 *
 * @returns the Policy page as a JSX.Element.
 */
const Policy = () => {
	return (
		<>
			<Page
				logoHeader={false}
				pageName='Privacy Policy'
				content={
					<div className={styles.officalPagesBody}>
						<h1 className={styles.headingStyle}>Privacy Policy for Sky.Net</h1>
						<p>
							At Sky.Net (“the App”), we value your privacy and are committed to protecting your personal
							information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your
							information when you use our App. By using Sky.Net, you agree to the collection and use of
							information in accordance with this policy.
						</p>
						<h2 className={styles.headingStyle}>1. Information We Collect</h2>
						<p>We collect several types of information to provide and improve our service to you:</p>
						<h3 className={styles.secondHeading}>1.1 Personal Information</h3>
						<p>
							When you create an account or use Sky.Net, we may collect personally identifiable
							information, such as:
						</p>
						<ul>
							<li>Name</li>
							<li>Email address</li>
							<li>Profile picture</li>
							<li>Date of birth</li>
							<li>Location</li>
						</ul>
						<h3 className={styles.secondHeading}>1.2 Usage Data</h3>
						<p>We collect information on how the App is accessed and used, including:</p>
						<ul>
							<li>Your device’s Internet Protocol (IP) address</li>
							<li>Browser type and version</li>
							<li>The pages of our App you visit</li>
							<li>The time and date of your visit</li>
							<li>The time spent on those pages</li>
							<li>Unique device identifiers</li>
							<li>Other diagnostic data</li>
						</ul>
						<h3 className={styles.secondHeading}>1.3 Cookies and Tracking Technologies</h3>
						<p>
							We use cookies and similar tracking technologies to track activity on our App and hold
							certain information. Cookies are files with a small amount of data which may include an
							anonymous unique identifier.
						</p>
						<h2 className={styles.headingStyle}>2. How We Use Your Information</h2>
						<p>Sky.Net uses the collected data for various purposes:</p>
						<ul>
							<li>To provide and maintain the App</li>
							<li>To notify you about changes to our App</li>
							<li>
								To allow you to participate in interactive features of our App when you choose to do so
							</li>
							<li>To provide customer support</li>
							<li>To gather analysis or valuable information so that we can improve our App</li>
							<li>To monitor the usage of our App</li>
							<li>To detect, prevent, and address technical issues</li>
						</ul>
						<h2 className={styles.headingStyle}>3. Sharing Your Information</h2>
						<p>
							We do not sell, trade, or otherwise transfer to outside parties your personally identifiable
							information, except in the following situations:
						</p>
						<ul>
							<li>
								<strong>With your consent</strong>: We may share your information with third parties if
								you give us consent to do so.
							</li>
							<li>
								<strong>Compliance with laws</strong>: We may disclose your information where we are
								legally required to do so to comply with applicable laws, regulations, or legal
								processes.
							</li>
							<li>
								<strong>Service providers</strong>: We may employ third-party companies and individuals
								to facilitate our App, provide the App on our behalf, perform App-related services, or
								assist us in analyzing how our App is used.
							</li>
							<li>
								<strong>Business transfers</strong>: If we are involved in a merger, acquisition, or
								asset sale, your information may be transferred.
							</li>
						</ul>
						<h2 className={styles.headingStyle}>4. Security of Your Information</h2>
						<p>
							The security of your information is important to us. We implement a variety of security
							measures to maintain the safety of your personal information. However, no method of
							transmission over the Internet or method of electronic storage is 100% secure, so we cannot
							guarantee its absolute security.
						</p>
						<h2 className={styles.headingStyle}>5. Data Retention</h2>
						<p>
							We will retain your personal information only for as long as is necessary for the purposes
							set out in this Privacy Policy. We will retain and use your information to the extent
							necessary to comply with our legal obligations, resolve disputes, and enforce our
							agreements.
						</p>
						<h2 className={styles.headingStyle}>6. Your Data Protection Rights</h2>
						<p>
							Depending on your jurisdiction, you may have the following rights regarding your personal
							information:
						</p>
						<ul>
							<li>
								<strong>The right to access</strong>: You have the right to request copies of your
								personal data.
							</li>
							<li>
								<strong>The right to rectification</strong>: You have the right to request that we
								correct any information you believe is inaccurate or complete information you believe is
								incomplete.
							</li>
							<li>
								<strong>The right to erasure</strong>: You have the right to request that we erase your
								personal data, under certain conditions.
							</li>
							<li>
								<strong>The right to restrict processing</strong>: You have the right to request that we
								restrict the processing of your personal data, under certain conditions.
							</li>
							<li>
								<strong>The right to object to processing</strong>: You have the right to object to our
								processing of your personal data, under certain conditions.
							</li>
							<li>
								<strong>The right to data portability</strong>: You have the right to request that we
								transfer the data that we have collected to another organization, or directly to you,
								under certain conditions.
							</li>
						</ul>
						<p>
							If you make a request, we have one month to respond to you. If you would like to exercise
							any of these rights, please contact us at our provided contact information.
						</p>
						<h2 className={styles.headingStyle}>7. Changes to This Privacy Policy</h2>
						<p>
							We may update our Privacy Policy from time to time. We will notify you of any changes by
							posting the new Privacy Policy on this page. You are advised to review this Privacy Policy
							periodically for any changes. Changes to this Privacy Policy are effective when they are
							posted on this page.
						</p>
						<p>
							<strong>
								By using Sky.Net, you acknowledge that you have read, understood, and agree to be bound
								by this Privacy Policy.
							</strong>
						</p>
					</div>
				}
			/>
		</>
	);
};

/**
 * Exports the Policy page for external use.
 */
export default Policy;
