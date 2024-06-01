/* Stylesheet imports */
import styles from '../about-page.module.css';

/* Imports from other components created */
import Page from '../../../components/kebab-page/kebab-page';

/**
 * Constructs and returns the Terms of Use page.
 *
 * @returns the Terms of Use page as a JSX.Element.
 */
const Terms = () => {
	return (
		<>
			<Page
				logoHeader={false}
				pageName='Terms of Use'
				content={
					<div className={styles.officalPagesBody}>
						<h1 className={styles.headingStyle}>Terms of Use for Sky.Net</h1>
						<p>
							Welcome to Sky.Net (“the App”), a social media platform designed to facilitate
							interplanetary communication. By accessing or using the App, you agree to comply with and be
							bound by the following Terms of Use. Please read these terms carefully. If you do not agree
							with these terms, you should not use the App.
						</p>
						<h2 className={styles.secondHeading}>Acceptance of Terms</h2>
						<p>
							By creating an account or using Sky.Net, you agree to these Terms of Use and any additional
							terms applicable to specific features of the App.
						</p>
						<h2 className={styles.secondHeading}>Eligibility</h2>
						<p>
							You must be at least 13 years old, that is your age relative to your home planet, to use
							Sky.Net. By using the App, you represent and warrant that you meet this age requirement.
						</p>
						<h2 className={styles.secondHeading}>User Accounts</h2>
						<p>
							You are responsible for maintaining the confidentiality of your account information and for
							all activities that occur under your account. You agree to notify us immediately of any
							unauthorized use of your account.
						</p>
						<h2 className={styles.secondHeading}>User Conduct</h2>
						<p>You agree not to use Sky.Net to:</p>
						<ul>
							<li>
								Post, upload, or distribute any content that is unlawful, harmful, threatening, abusive,
								harassing, defamatory, vulgar, obscene, or otherwise objectionable.
							</li>
							<li>
								Impersonate any person or entity, or falsely state or otherwise misrepresent your
								affiliation with a person or entity.
							</li>
							<li>Violate any local, state, national, or interplanetary law or regulation.</li>
							<li>Engage in any activity that could interfere with or disrupt the App.</li>
						</ul>
						<h2 className={styles.secondHeading}>Content Ownership and License</h2>
						<ul>
							<li>
								<strong>Your Content</strong>: You retain ownership of all content you post, upload, or
								otherwise make available through Sky.Net. By doing so, you grant us a worldwide,
								non-exclusive, royalty-free license to use, distribute, reproduce, modify, adapt,
								publicly perform, and publicly display such content in connection with the App.
							</li>
							<li>
								<strong>Our Content</strong>: All content available on Sky.Net, except user-generated
								content, is owned by or licensed to us and is protected by intellectual property laws.
							</li>
						</ul>
						<h2 className={styles.secondHeading}>Privacy</h2>
						<p>
							Your privacy is important to us. Please review our
							<a href='/about/policy'>[Privacy Policy]</a> to understand how we collect, use, and share
							information about you.
						</p>
						<h2 className={styles.secondHeading}>Interplanetary Data Transfer</h2>
						<p>
							Given the nature of interplanetary communication, data transfer times and reliability may
							vary. You acknowledge and accept any potential delays or disruptions in data transmission.
						</p>
						<h2 className={styles.secondHeading}>Prohibited Uses</h2>
						<p>
							You agree not to use Sky.Net for any commercial purposes without our prior written consent.
							You also agree not to use the App to collect or harvest any personally identifiable
							information, including account names, from Sky.Net.
						</p>
						<h2 className={styles.secondHeading}>Termination</h2>
						<p>
							We reserve the right to terminate or suspend your account and access to Sky.Net at our sole
							discretion, without notice and without liability, for any reason, including if we believe
							you have violated these Terms of Use.
						</p>
						<h2 className={styles.secondHeading}>Disclaimer of Warranties</h2>
						<p>
							Sky.Net is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no
							warranties, express or implied, regarding the App&#39;s operation or your use of the App,
							including but not limited to warranties of merchantability, fitness for a particular
							purpose, or non-infringement.
						</p>
						<h2 className={styles.secondHeading}>Limitation of Liability</h2>
						<p>
							To the maximum extent permitted by law, we shall not be liable for any indirect, incidental,
							special, consequential, or punitive damages, or any loss of profits or revenues, whether
							incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible
							losses, resulting from (a) your use or inability to use Sky.Net; (b) any unauthorized access
							to or use of our servers and/or any personal information stored therein; (c) any
							interruption or cessation of transmission to or from Sky.Net; or (d) any bugs, viruses,
							trojan horses, or the like that may be transmitted to or through the App by any third party.
						</p>
						<h2 className={styles.secondHeading}>Governing Law</h2>
						<p>
							These Terms of Use are governed by and construed in accordance with the laws of SkyOps,
							without regard to its conflict of law principles.
						</p>
						<h2 className={styles.secondHeading}>Changes to the Terms of Use</h2>
						<p>
							We may modify these Terms of Use at any time. We will notify you of any changes by posting
							the new Terms of Use on Sky.Net. Your continued use of the App after any such changes
							constitutes your acceptance of the new Terms of Use.
						</p>
						<p>
							<strong>
								By using Sky.Net, you acknowledge that you have read, understood, and agree to be bound
								by these Terms of Use.
							</strong>
						</p>
					</div>
				}
			/>
		</>
	);
};

/**
 * Exports the Terms of Use page for external use.
 */
export default Terms;
