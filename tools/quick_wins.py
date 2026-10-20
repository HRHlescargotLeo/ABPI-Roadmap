#!/usr/bin/env python3
"""Writes the quick-win pages into src/quick-wins/ and the ordered list of
quick wins into src/js/quick-wins.js (JSON data only, no behaviour).

Run from the project root, then build as usual:
    python3 tools/quick_wins.py && node build-includes.js && node validate.js

Each quick win is shown on its own, against abpi.org.uk as it was on
30 September 2026, with a "Today / Proposed" switch. No estimates, prices,
days or effort labels appear anywhere in the pages: costs live in the
proposal, which is shown to the ABPI separately.
"""
import json
import os
from html import escape

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'src', 'quick-wins')

THEMES = [
    ('join', 'Joining the ABPI'),
    ('members', 'Members'),
    ('data', 'Facts and figures'),
    ('pubs', 'Publications'),
    ('news', 'News, media and email'),
    ('events', 'Events'),
    ('code', 'The Code of Practice'),
    ('care', 'Accuracy and housekeeping'),
    ('look', 'Look, feel and accessibility'),
]

QW = []


def qw(**k):
    QW.append(k)


def mock_page_head(title, crumb='ABPI Website'):
    """The top of an abpi.org.uk content page, rebuilt in the prototype's own styles."""
    return f'<div class="mock-head"><p class="mock-crumb">{crumb}</p><h2 class="mock-h1">{title}</h2></div>'


# ---------------------------------------------------------------------------
# Joining the ABPI
# ---------------------------------------------------------------------------
qw(slug='membership-checker', theme='join', idea=2,
   title='"Which membership fits us?" checker',
   summary='Three short questions that tell a company which of the three membership categories it fits, with a link to enquire.',
   url='abpi.org.uk/membership/', also='Also part of prototype 1, Join the ABPI.',
   why="The three categories are explained in paragraphs spread across four pages, reached through a \"Please select the area…\" dropdown. A company has to read all of them to work out where it fits. Three questions do the same job in a few seconds, and the answer can carry straight into an enquiry.",
   before_cap='The categories are separate pages behind a dropdown, each a few paragraphs long.',
   after_cap='Three questions, a recommendation and a link to enquire. Try it.',
   before=mock_page_head('Membership', 'ABPI Website › Membership') + '''<div class="mock-select"><span>Please select the area…</span><span aria-hidden="true">▾</span></div>
<ul class="mock-list"><li>Full membership</li><li>Research affiliate membership</li><li>General affiliate membership</li><li>Membership FAQs</li></ul>
<p>We offer three different types of membership. Full Members represent many established research-based pharmaceutical companies. Our Research Affiliate members are companies that carry out their business in the UK and are engaged in the research or development or both of medicines for human use, but which have no sales of such products in the UK. General Affiliate membership is open to organisations with an interest in the pharmaceutical industry that operate in the UK.</p>''',
   after='''<form class="checker" id="checker" data-enquiry="../pages/join-enquiry.html" novalidate>
<p class="muted">Three questions at most. Nothing is sent to us.</p>
<fieldset data-q><legend>Does your organisation operate in the UK?</legend><div class="opts"><label><input type="radio" name="q-uk" value="yes" id="q-uk-yes"> Yes</label><label><input type="radio" name="q-uk" value="no" id="q-uk-no"> No</label></div></fieldset>
<fieldset data-q hidden><legend>Do you supply or manufacture prescription medicines in the UK, or hold a UK marketing authorisation?</legend><div class="opts"><label><input type="radio" name="q-sells" value="yes" id="q-sells-yes"> Yes</label><label><input type="radio" name="q-sells" value="no" id="q-sells-no"> No</label></div></fieldset>
<fieldset data-q hidden><legend>Do you research or develop medicines in the UK?</legend><div class="opts"><label><input type="radio" name="q-rd" value="yes" id="q-rd-yes"> Yes</label><label><input type="radio" name="q-rd" value="no" id="q-rd-no"> No, we work with companies that do</label></div></fieldset>
<div class="checker-result" id="checker-result" role="status" hidden><h3>Result</h3><p></p><div class="row"><a class="btn" href="../pages/join-enquiry.html" data-checker-go>Start an enquiry</a><button type="button" class="btn btn-secondary" data-checker-reset>Start again</button></div></div>
</form>''')

qw(slug='fees-explained', theme='join', idea=3,
   title='Explain how membership fees are worked out',
   summary='A short table setting out what each category\'s fee is based on, in place of "please get in touch".',
   url='abpi.org.uk/membership/membership-faqs/', also='Also part of prototype 1, Join the ABPI.',
   why="Cost is usually the first question a prospective member has, and the FAQ answers it by asking them to email. The Full membership page mentions a subscription and a levy without saying what either is based on. Explaining the basis, with or without figures, removes a reason not to get in touch and saves the membership team a call that only exists to answer it.",
   before_cap='The FAQ asks people to email to find out the cost.',
   after_cap='What each fee is based on, with the figures left for the ABPI to decide on.',
   before=mock_page_head('Membership FAQs', 'ABPI Website › Membership') + '''<h3 class="mock-q">How much does it cost to become a member?</h3>
<p>For information on how much it costs to be a member of the ABPI, please get in touch via membership@abpi.org.uk to arrange a phone call or face-to-face meeting with our membership services team. We will be happy to explain how to calculate the membership fee for your organisation.</p>''',
   after='''<h3>How fees are worked out</h3><p>Fees depend on your category and the size of your UK business. We'll confirm yours before you apply.</p>
<div class="table-wrap"><table class="fee-table"><thead><tr><th scope="col">Category</th><th scope="col">What the fee is based on</th><th scope="col">Indicative range</th></tr></thead><tbody>
<tr><th scope="row">Full membership</th><td>An annual subscription plus a levy, based on [UK sales of branded prescription medicines].</td><td>[From £x a year]</td></tr>
<tr><th scope="row">Research affiliate</th><td>[A flat annual fee, banded by UK R&amp;D headcount.]</td><td>[From £x a year]</td></tr>
<tr><th scope="row">General affiliate</th><td>[A flat annual fee.]</td><td>[£x a year]</td></tr></tbody></table></div>
<p class="wf-meta">Bracketed text is for the ABPI to complete. The range column can be left out.</p>''')

qw(slug='benefits-proof', theme='join', idea=4,
   title='A membership benefits section with proof',
   summary='Four benefit blocks, each with a figure and a member quote, in place of long paragraphs.',
   url='abpi.org.uk/membership/', also='Also part of prototype 1, Join the ABPI.',
   why="The benefits of membership are described in long paragraphs (\"We work for our members in two ways…\") with no numbers and no member voices. Four short blocks, each with one figure the ABPI can stand behind and a line from a member, make the case faster and are easier to keep up to date.",
   before_cap='Benefits written as long paragraphs.',
   after_cap='Four blocks with a figure and a member quote each. Figures and quotes are placeholders.',
   before='''<h3>We work for our members in two ways</h3><p>Developing a compelling single voice for the prescription medicines and research &amp; development industries. With stakeholders in the life-sciences and healthcare arena, to spread our messages to Government and other stakeholders for the benefit of patients.</p><p>Working on behalf of member companies of all sizes. There is an opportunity for our member companies to be engaged with a wide range of industry activities. Our Smaller Companies Committee is dedicated to supporting and addressing the specific issues and needs impacting this particular defined group of companies…</p><h3>Adding value to our members</h3><p>We offer additional value to our members through a range of proactive services in the form of up to date information and briefings, as well as a wide range of Industry data and resources to draw upon and utilise…</p>''',
   after='''<div class="benefits">
<div class="benefit"><span class="big">[20+]</span><h3>Influence</h3><p>Shape ABPI positions through board sponsored groups and project teams.</p><blockquote>[Member quote, with name and role]</blockquote></div>
<div class="benefit"><span class="big">[Weekly]</span><h3>Insight</h3><p>Weekly updates, the Chief Executive's update and UK nations updates.</p><blockquote>[Member quote]</blockquote></div>
<div class="benefit"><span class="big">[10]</span><h3>Expertise</h3><p>Specialists in pricing, access, regulation, legal, manufacturing and more.</p><blockquote>[Member quote]</blockquote></div>
<div class="benefit"><span class="big">[x]</span><h3>Network</h3><p>Member events, masterclasses and forums for functional leads.</p><blockquote>[Member quote]</blockquote></div></div>''')

qw(slug='membership-contact', theme='join', idea=5,
   title='A named membership contact',
   summary='A contact card with a name, role, email and phone on each membership page.',
   url='abpi.org.uk/membership/', also='Also part of prototype 1, Join the ABPI.',
   why="The only route to the membership team on the main membership page is a phone number at the end of the last paragraph, and it differs from the number in the footer. A company thinking about joining is more likely to pick up the phone to a named person than to a department.",
   before_cap='A phone number at the end of a long page.',
   after_cap='A contact card next to the call to action.',
   before='''<p>…There are many benefits of becoming a member of the ABPI and we are always happy to visit companies and discuss these in greater detail. If you would like to arrange a company visit, please contact the Membership Services – 0207 747 1414.</p>''',
   after='''<div class="contact-card panel"><div class="wf-placeholder avatar">Photo</div><div><p><strong>[Name]</strong>, [Role], Membership Services</p><p class="contact-lines"><span>membership@abpi.org.uk</span><span>0207 747 1414</span></p><p class="contact-lines"><a href="../pages/join-enquiry.html">Send an enquiry</a></p></div></div>''')

qw(slug='smaller-companies', theme='join', idea=6,
   title='A route for smaller and emerging companies',
   summary='A short section for biotechs and smaller companies: which category fits, what the Smaller Companies Committee does, and a case study.',
   url='abpi.org.uk/membership/', also='Also part of prototype 1, Join the ABPI.',
   why="Smaller companies are the members the ABPI is most likely to be competing for, and the Smaller Companies Committee gets one paragraph partway down the membership page. A section written for them, saying plainly which category fits and what they get, costs little and speaks to the group with the most choice about where to spend a membership fee.",
   before_cap='One paragraph about the Smaller Companies Committee.',
   after_cap='A section written for smaller companies, with a route in.',
   before='''<p>Working on behalf of member companies of all sizes. There is an opportunity for our member companies to be engaged with a wide range of industry activities. Our Smaller Companies Committee is dedicated to supporting and addressing the specific issues and needs impacting this particular defined group of companies. Three members of the Smaller Companies Committee also sit on the ABPI Board in order that this sector of industry is also reflected in wider ABPI considerations and approaches.</p>''',
   after='''<div class="split"><div><p class="eyebrow">Smaller and emerging companies</p><h3>Membership for biotechs and smaller companies</h3><p>If you research or develop medicines in the UK but don't sell them here yet, research affiliate membership is likely to fit. Our Smaller Companies Committee looks after the issues that affect you in particular, and three of its members sit on the ABPI Board.</p><div class="row"><a class="btn" href="../pages/join.html#checker">Check which membership fits</a><a class="btn btn-secondary" href="#">About the committee</a></div></div><div class="wf-placeholder ratio-16-9">Case study video: a smaller member company</div></div>''')

qw(slug='membership-menu', theme='join', idea=7,
   title='One clear "join" link in the Membership menu',
   summary='Point "Become an ABPI member" at the joining journey, rather than at the same page as "ABPI Membership".',
   url='abpi.org.uk', also='',
   why="In the Membership menu, \"ABPI Membership\" and \"Become an ABPI member\" both go to /membership/. The second one looks like the way in, so it should go somewhere different: the checker or the enquiry. It's a change to one menu item.",
   before_cap='Two menu items that go to the same page.',
   after_cap='Each item goes somewhere different. Open the menu.',
   before='''<div class="mock-nav"><span class="mock-logo">abpi</span><span>About the ABPI</span><span>Our focus</span>
<div class="mock-menu"><button type="button" class="mock-menu-trigger" aria-expanded="false">Membership ▾</button><div class="mock-menu-panel"><ul><li>ABPI Membership <code>/membership/</code></li><li>Events <code>/membership2/events/</code></li><li>ABPI Members list <code>/membership2/abpi-members-list/</code></li><li>Become an ABPI member <code>/membership/</code></li></ul></div></div>
<span>Our industry</span><span>News</span></div>''',
   after='''<div class="mock-nav"><span class="mock-logo">abpi</span><span>About the ABPI</span><span>Our focus</span>
<div class="mock-menu"><button type="button" class="mock-menu-trigger" aria-expanded="false">Membership ▾</button><div class="mock-menu-panel"><ul><li>About membership <code>/membership/</code></li><li>Our members <code>/membership/members/</code></li><li>Member area <code>/members/</code></li><li><strong>Join the ABPI</strong> <code>/membership/join/</code></li></ul></div></div>
<span>Our industry</span><span>News</span></div>''')

# ---------------------------------------------------------------------------
# Members
# ---------------------------------------------------------------------------
qw(slug='member-login', theme='members', idea=9,
   title='A visible way in for members',
   summary='A "Member area" link in the header of every page, opening a sign-in for the extranet.',
   url='abpi.org.uk', also='Also part of prototype 2, Members.',
   why="Members are told they get \"access to our extranet\" when they join, but there is no login link anywhere on the site, in the header or the footer. Members presumably bookmark it or search for it. A link in the header is the smallest possible change and it signals to everyone else that there is something behind the door.",
   before_cap='No sign-in or member area link in the header.',
   after_cap='"Member area" sits in the header on every page. Open it.',
   before='''<div class="mock-nav"><span class="mock-logo">abpi</span><span>About the ABPI</span><span>Our focus</span><span>Membership</span><span>Our industry</span><span>News</span><span>Publications</span><span class="mock-search">Search</span><span class="mock-outline">Resources for schools</span></div>''',
   after='''<div class="mock-utility"><a href="#">Contact us</a><div class="mock-menu"><button type="button" class="mock-menu-trigger" aria-expanded="false">Member area ▾</button><div class="mock-menu-panel right"><p><strong>Members</strong></p><p class="wf-meta">Briefings, groups and member events.</p><a class="btn btn-sm" href="../pages/member-area.html">Sign in</a></div></div></div>
<div class="mock-nav"><span class="mock-logo">abpi</span><span>About the ABPI</span><span>Our focus</span><span>Membership</span><span>Our industry</span><span>News</span><span>Publications</span><span class="mock-search">Search</span><span class="mock-outline">Resources for schools</span></div>''')

# ---------------------------------------------------------------------------
# Facts and figures
# ---------------------------------------------------------------------------
qw(slug='fix-facts-page', theme='data', idea=13,
   title='Fix the Facts and figures page',
   summary='Complete the two captions that stop mid-word and restore the missing references.',
   url='abpi.org.uk/facts-figures-and-industry-data/', also='Also part of prototype 3, Industry in numbers.',
   why="Two statistic captions on the page stop mid-word (\"a significantly lower pro\", \"in their first year follow\"), one has an empty superscript, and figures cite references [9] and [12] when the list ends at [7]. These are the numbers journalists and officials quote. It is a content fix, and it matters more than its size suggests.",
   before_cap='Captions cut off mid-word; references cited that are not in the list.',
   after_cap='Complete captions and a complete reference list. Wording in brackets is for the ABPI to confirm.',
   before='''<h3>Health system statistics</h3><div class="stat-grid">
<div><b>£1.2bn</b><span>income to the NHS for industry clinical trials initiated in 2022/23 [9]</span></div>
<div><b>9%</b><span>amount the UK invests of overall healthcare spending on medicines – a significantly lower pro</span></div>
<div><b>578</b><span>industry clinical trials initiated in the UK in 2024 (increasing from 426 trials in 2023, but below 2017 (667 trials) [12]</span></div>
<div><b>52%</b><span>average uptake of medicines launched between 2018 and 2022, in their first year follow</span></div></div>
<p class="refs"><strong>References:</strong> [1] ONS… [2] ONS… [3] ONS… [4] ONS… [5] ONS… [6] Frontier Economics… [7] ABPI, 'UK industry clinical trials: Translating actions into impact', Dec 2025</p>''',
   after='''<h3>Health system statistics</h3><div class="stat-grid">
<div><b>£1.2bn</b><span>income to the NHS for industry clinical trials initiated in 2022/23 [9]</span></div>
<div><b>9%</b><span>of overall healthcare spending the UK invests in medicines – a significantly lower [proportion than comparable countries] [10]</span></div>
<div><b>578</b><span>industry clinical trials initiated in the UK in 2024, up from 426 in 2023 but below the 667 of 2017 [12]</span></div>
<div><b>52%</b><span>average uptake of medicines launched between 2018 and 2022 in their first year [following NICE recommendation] [13]</span></div></div>
<p class="refs"><strong>References:</strong> [1]–[7] as now. [8] [Source]. [9] Frontier Economics, 'The value of industry clinical trials to the UK', Dec 2024. [10] [Source]. [11] [Source]. [12] ABPI, 'UK industry clinical trials', Dec 2025. [13] [Source].</p>''')

qw(slug='jobs-figure', theme='data', idea=14,
   title='One figure for jobs',
   summary='Use the same jobs figure on the Facts page and the Careers page, or say why they differ.',
   url='abpi.org.uk/careers/', also='Also part of prototype 3, Industry in numbers.',
   why="The Facts and figures page says the industry supports 125,702 jobs. The Careers page says it \"directly employs over 73,000 people\". They may well be two different measures, but nothing on either page says so, and anyone comparing them will assume one is wrong.",
   before_cap='Two different jobs figures on two pages, with no explanation.',
   after_cap='The same figure on both, with the measure stated. Wording for the ABPI to confirm.',
   before='''<div class="two-col"><div class="panel"><p class="wf-meta">Facts, figures and industry data</p><p class="big-fig">125,702</p><p>jobs [4]</p></div><div class="panel"><p class="wf-meta">Careers in the pharmaceutical industry</p><p>This is a knowledge driven industry, requiring a highly skilled workforce and directly employs over 73,000 people, with over 23,000 of these in research and development.</p></div></div>''',
   after='''<div class="two-col"><div class="panel"><p class="wf-meta">Facts, figures and industry data</p><p class="big-fig">125,702</p><p>jobs in the UK pharmaceutical industry [measure, e.g. including manufacturing and wholesale]</p><p class="wf-meta">Source: ONS, Business Register and Employment Survey, October 2025</p></div><div class="panel"><p class="wf-meta">Careers in the pharmaceutical industry</p><p>The industry supports 125,702 jobs in the UK [measure], [x] of them in research and development.</p><p class="wf-meta">Source: ONS, Business Register and Employment Survey, October 2025</p></div></div>''')

qw(slug='stat-sources', theme='data', idea=15,
   title='A source and date under every statistic',
   summary='Show where each figure comes from wherever it appears, starting with the homepage.',
   url='abpi.org.uk', also='Also part of prototype 3, Industry in numbers.',
   why="The homepage shows three headline statistics with reference numbers [1], [2] and [3], but the references themselves are on a different page. A source line under each figure, drawn from the same record as the Facts page, means anyone quoting the figure from the homepage can cite it properly.",
   before_cap='Reference numbers that point to a list on another page.',
   after_cap='A short source and date under each figure.',
   before='''<h3>Economic statistics</h3><div class="stat-grid three"><div><b>£20.39bn</b><span>direct Gross Value Added (GVA) [1]</span></div><div><b>£9.3bn</b><span>investment in UK R&amp;D in 2024 [2]</span></div><div><b>£1 in every £6</b><span>invested by the private sector in R&amp;D is invested by the pharmaceutical industry [3]</span></div></div>''',
   after='''<h3>Economic statistics</h3><div class="stat-grid three"><div><b>£20.39bn</b><span>direct Gross Value Added (GVA)</span><small class="src">ONS, Regional GVA by industry, 2025</small></div><div><b>£9.3bn</b><span>investment in UK R&amp;D in 2024</span><small class="src">ONS, Business enterprise R&amp;D, Dec 2025</small></div><div><b>£1 in every £6</b><span>invested by the private sector in R&amp;D is invested by the pharmaceutical industry</span><small class="src">ONS, Business enterprise R&amp;D, Dec 2025</small></div></div>''')

# ---------------------------------------------------------------------------
# Publications
# ---------------------------------------------------------------------------
OLD_THEMES = ['ABPI Manifesto (2)', 'ABPI Patient Advisory Council (2)', 'ATMP (1)', 'Access (1)', 'Advanced Therapy Medicinal Products (ATMPs) (2)', 'Animals in research (2)', 'Antimicrobials AMR (3)', 'Appropriate prescribing (1)', 'Cancer (1)', 'Careers in the pharmaceutical industry (1)', 'Clinical research (7)', 'Clinical trials (7)', 'Code of Practice (1)', 'Devolved Nations - Cymru Wales (7)', 'Devolved Nations - Northern Ireland (3)', 'Devolved Nations - Scotland (4)', 'Disclosure (11)', 'Health Data (5)', 'Homecare (1)', 'International (4)', 'MMIP (3)', 'Manufacturing (2)', 'Medicine sales (1)', 'Medicines pricing (1)', 'NHS (8)', 'NICE (6)', 'Partnerships (1)', 'Patient Organisations and Charities (1)', 'Patient safety and pharmacovigilance (1)', 'Reputation (1)', 'Research and Development (3)', 'Skills (5)', 'Statutory Scheme (3)', 'Supply (2)', 'VPAG (1)', 'Vaccines (1)', 'Value (3)']
NEW_THEMES = ['Clinical research', 'Health data', 'Investment and growth', 'Medicine supply', 'Rare diseases', 'Research and manufacturing', 'Transparency and the Code', 'Value and access', 'Vaccines', 'Antimicrobial resistance', 'Sustainability', 'UK nations']
qw(slug='publication-themes', theme='pubs', idea=20,
   title='Twelve publication themes instead of around 38',
   summary='Merge the publication themes into a short list that matches the "Our focus" menu.',
   url='abpi.org.uk/publications/', also='Also part of prototype 4, Publications.',
   why="The theme filter has grown one tag at a time. Many themes hold a single item, and some are near-duplicates: \"ATMP\" and \"Advanced Therapy Medicinal Products (ATMPs)\"; \"Clinical research\" and \"Clinical trials\", with seven items each. Twelve themes that match the site's own menu make the filter usable, and retagging the back catalogue is a one-off job.",
   before_cap='The theme filter as it is today (after "Show more").',
   after_cap='Twelve themes, matching the "Our focus" menu.',
   before='<h3 class="filter-h">Theme</h3><ul class="theme-list">' + ''.join(f'<li>{escape(t)}</li>' for t in OLD_THEMES) + '</ul>',
   after='<h3 class="filter-h">Theme</h3><ul class="theme-list short">' + ''.join(f'<li><label class="check"><input type="checkbox" id="th-{i}"> {escape(t)}</label></li>' for i, t in enumerate(NEW_THEMES)) + '</ul>')

qw(slug='result-summaries', theme='pubs', idea=21,
   title='A proper summary and date on every publication',
   summary='Every result shows its type, date and format, with a summary written for the listing.',
   url='abpi.org.uk/publications/', also='Also part of prototype 4, Publications.',
   why="Several results in the publications library show breadcrumb text where the summary should be, and none of them shows a date. Making the summary a required field in the CMS stops it happening again; showing the date and type is a template change.",
   before_cap='Breadcrumb text in place of a summary, and no date.',
   after_cap='Type, date, format and a written summary.',
   before='''<article class="mock-result"><h4>Pharmaceutical industry priorities for the Health Data Research Service</h4><p>ABPI Website, Publications, Pharmaceutical industry priorities for the Health Data Research Service, Pharmaceutical industry priorities for the Health Data Research Service, Published on: 20 August ...</p></article>
<article class="mock-result"><h4>A guide to the development and manufacture of medicines</h4><p>ABPI Website, Publications, A guide to the development and manufacture of medicines, A guide to the development and manufacture of medicines, Published on: 01 July ...</p></article>''',
   after='''<article class="pub-card"><p class="pub-meta"><span class="badge">Position</span> <span>20 Aug 2026</span> <span class="muted">· HTML · 8 min read</span></p><h3><a href="#">Pharmaceutical industry priorities for the Health Data Research Service</a></h3><p class="pub-summary">What the industry needs from the new Health Data Research Service to make the UK a first choice for data-enabled research.</p><p class="pub-theme muted">Health data</p></article>
<article class="pub-card"><p class="pub-meta"><span class="badge">Guidance</span> <span>1 Jul 2026</span> <span class="muted">· PDF · 15 min read</span></p><h3><a href="#">A guide to the development and manufacture of medicines</a></h3><p class="pub-summary">How a medicine goes from discovery to the patient, written for readers new to the industry.</p><p class="pub-theme muted">Research and manufacturing</p></article>''')

qw(slug='consultation-responses', theme='pubs', idea=23,
   title='A home for consultation responses',
   summary='Add "Consultation response" as a publication type, with the consulting body and closing date on each.',
   url='abpi.org.uk/publications/', also='Also part of prototype 4, Publications.',
   why="The ABPI responds to a steady stream of consultations, but the publication types are Report, Guidelines, Industry information, Key messages, Posters, Presentation, Partnerships and Code of Practice. Responses end up filed as one of those, if they are published at all. A type of its own makes them easy to find for the officials who asked for them.",
   before_cap='The publication types today.',
   after_cap='A "Consultation response" type, and how a response would be listed. The item shown is an example.',
   before='''<h3 class="filter-h">Type</h3><ul class="theme-list"><li>Code of Practice (1)</li><li>Guidelines (10)</li><li>Industry information (20)</li><li>Key messages (2)</li><li>Partnerships (1)</li><li>Posters (3)</li><li>Presentation (3)</li><li>Report (74)</li></ul>''',
   after='''<div class="split"><div><h3 class="filter-h">Type</h3><ul class="theme-list short"><li><label class="check"><input type="checkbox" id="ty-1"> Report</label></li><li><label class="check"><input type="checkbox" id="ty-2"> Position</label></li><li><label class="check"><input type="checkbox" id="ty-3" checked> Consultation response</label></li><li><label class="check"><input type="checkbox" id="ty-4"> Guidance</label></li><li><label class="check"><input type="checkbox" id="ty-5"> Data</label></li><li><label class="check"><input type="checkbox" id="ty-6"> Code of Practice</label></li></ul></div>
<article class="pub-card"><p class="pub-meta"><span class="badge">Consultation response</span> <span>[Date]</span></p><h3><a href="#">[Response to the consultation on …]</a></h3><dl class="kv"><dt>Consulting body</dt><dd>[e.g. MHRA]</dd><dt>Closed</dt><dd>[Date]</dd></dl><p class="pub-summary">[One-paragraph summary of the ABPI's response.]</p></article></div>''')

# ---------------------------------------------------------------------------
# News, media and email
# ---------------------------------------------------------------------------
qw(slug='email-signup', theme='news', idea=25,
   title='An email sign-up in the footer',
   summary='A short sign-up (email and one tick box) in the footer of every page, linking to a fuller preference page.',
   url='abpi.org.uk', also='Also part of prototype 5, Stay informed.',
   why="We couldn't find a newsletter or email alert sign-up anywhere on the site. The ABPI publishes something most weeks, and the people who would most like to hear about it have to remember to come and look. A footer sign-up connected to the email platform the ABPI already uses is the smallest version of this. Try submitting it.",
   before_cap='The footer: useful links, website info, no way to sign up.',
   after_cap='A sign-up in the footer, with validation. Nothing is sent.',
   before='''<div class="mock-footer"><div><h4>Useful links</h4><ul><li>Contact us</li><li>Careers</li><li>ABPI Exam</li><li>ABPI Schools</li></ul></div><div><h4>Website info</h4><ul><li>Terms &amp; conditions</li><li>Accessibility</li><li>Cookie policy</li><li>Privacy policy</li></ul></div></div>''',
   after='''<div class="mock-footer"><div><h4>Useful links</h4><ul><li>Contact us</li><li>Careers</li><li>ABPI Exam</li><li>ABPI Schools</li></ul></div><div><h4>Website info</h4><ul><li>Terms &amp; conditions</li><li>Accessibility</li><li>Cookie policy</li><li>Privacy policy</li></ul></div>
<div class="footer-signup"><h4>Get our updates</h4><form data-qw-form="su-done" novalidate><div class="field" data-msg="Enter your email address."><label for="su-email">Email address</label><input type="email" id="su-email" required autocomplete="email"></div><div class="field" data-msg="Please agree so we can email you."><label class="check"><input type="checkbox" id="su-ok" required> Send me the ABPI's weekly round-up. I can unsubscribe at any time.</label></div><button type="submit" class="btn">Sign up</button> <a href="../pages/stay-informed.html">Choose topics</a></form><p id="su-done" class="confirm-inline" hidden>Thanks. Check your inbox to confirm.</p></div></div>''')

qw(slug='share-previews', theme='news', idea=27,
   title='Share previews that show a title and image',
   summary='Fill in the title, description and image that social sites and messaging apps use when a page is shared.',
   url='abpi.org.uk/media/', also='',
   why="The Media Centre's share tags (og:title, og:description, og:image) are empty, and the homepage has no share image, so a link posted on LinkedIn or sent in Teams shows up as a bare address. Defaults for each page type, with overrides for reports and news, fix it everywhere at once.",
   before_cap='How a link to the Media Centre appears when shared today.',
   after_cap='The same link with a title, description and image.',
   before='''<div class="share-card bare"><div class="share-body"><span class="share-host">abpi.org.uk</span><b>https://www.abpi.org.uk/media/</b></div></div>
<pre class="code-snip">&lt;meta property="og:title" content=""&gt;
&lt;meta property="og:description" content=""&gt;
&lt;meta property="og:image" content=""&gt;</pre>''',
   after='''<div class="share-card"><div class="wf-placeholder ratio-16-9">Share image</div><div class="share-body"><span class="share-host">abpi.org.uk</span><b>Media Centre | ABPI</b><span>News, statements and comment from the Association of the British Pharmaceutical Industry.</span></div></div>
<pre class="code-snip">&lt;meta property="og:title" content="Media Centre | ABPI"&gt;
&lt;meta property="og:description" content="News, statements and comment from the ABPI."&gt;
&lt;meta property="og:image" content="…/abpi-share-default.jpg"&gt;</pre>''')

qw(slug='news-archive', theme='news', idea=28,
   title='Restore the news archive',
   summary='Retag older news so it can be found from the Media Centre, not only by search.',
   url='abpi.org.uk/media/', also='',
   why="The year filter in the Media Centre shows 2026 (30), 2025 (63), 2024 (68) and 2023 (1). Older stories still exist, a December 2023 news page among them, but they can't be reached from the listing. It looks like tags were lost in a migration. Retagging them puts the ABPI's record back where people can see it.",
   before_cap='The year filter today.',
   after_cap='Every year with its stories, once retagged. Counts are placeholders.',
   before='''<h3 class="filter-h">Year</h3><ul class="theme-list"><li>All (163)</li><li>2026 (30)</li><li>2025 (63)</li><li>2024 (68)</li><li>2023 (1)</li></ul>''',
   after='''<h3 class="filter-h">Year</h3><ul class="theme-list"><li>All ([n])</li><li>2026 (30)</li><li>2025 (63)</li><li>2024 (68)</li><li>2023 ([n])</li><li>2022 ([n])</li><li>2021 ([n])</li><li>2020 ([n])</li><li>Earlier ([n])</li></ul>''')

qw(slug='author-pages', theme='news', idea=29,
   title='Author pages and clickable tags',
   summary='Link each blog author to a page with their role and posts, and make tags open a filtered list.',
   url='abpi.org.uk/media/blogs/', also='',
   why="Blogs show the author as plain text (\"by Alan Lamb\") and the tags under each post aren't links. The ABPI's specialists are part of its authority. An author page, and tags that lead somewhere, give readers a reason to read the next post.",
   before_cap='Author and tags as plain text.',
   after_cap='The author links to a profile; tags link to filtered lists.',
   before='''<p class="mock-meta">28 August 2026 · Posted in Blog · by Alan Lamb</p><h3>NICE has updated how it values quality of life - the move from 3L to 5L</h3><p>This week, NICE confirmed it is adopting the UK EQ-5D-5L value set…</p><p class="mock-meta">TAGS<br>NICE · NICE Methods Review · Evaluation · Health and Access to Medicines</p>''',
   after='''<p class="mock-meta">28 August 2026 · Blog · by <a href="#">Alan Lamb</a></p><h3>NICE has updated how it values quality of life - the move from 3L to 5L</h3><p>This week, NICE confirmed it is adopting the UK EQ-5D-5L value set…</p><p class="chips-row"><a class="chip" href="#">NICE</a><a class="chip" href="#">NICE Methods Review</a><a class="chip" href="#">Evaluation</a><a class="chip" href="#">Health and Access to Medicines</a></p>
<div class="person author-card"><div class="wf-placeholder avatar">Photo</div><div><b>Alan Lamb</b><p>[Role at the ABPI]</p><p><a href="#">More from Alan</a></p></div></div>''')

qw(slug='glossary-popovers', theme='news', idea=30,
   title='Glossary definitions in place',
   summary='Show a glossary definition in a small popover, rather than taking the reader to the glossary page.',
   url='abpi.org.uk/about-the-abpi/', also='',
   why="The glossary is one of the site's real strengths, and body copy already links terms to it. Clicking a term, though, takes the reader away from what they were reading. Showing the definition where it is, with a link to the full entry, keeps the benefit without the detour. Click the term to try it.",
   before_cap='The term links away to the glossary page.',
   after_cap='The definition opens in place. Click "PMCPA".',
   before='''<p>The ABPI Code of Practice is administered by the <a href="#">PMCPA</a>, which operates independently of the ABPI.</p><p class="wf-meta">Clicking the link opens abpi.org.uk/glossary/#prescription-medicine-code-of-practice-authority.</p>''',
   after='''<p>The ABPI Code of Practice is administered by the <button type="button" class="gloss-term" data-pop="pop-pmcpa" aria-expanded="false">PMCPA</button>, which operates independently of the ABPI.</p>
<div class="gloss-pop" id="pop-pmcpa" role="dialog" aria-label="Glossary: PMCPA" hidden><p class="eyebrow">Glossary</p><h4>Prescription Medicines Code of Practice Authority (PMCPA)</h4><p>[Definition from the ABPI glossary.]</p><a href="#">Full glossary entry</a></div>''')

qw(slug='explainer-format', theme='news', idea=31,
   title='An explainer format',
   summary='A recurring "Explained" format for policy terms, with a one-sentence answer at the top and links to the glossary.',
   url='abpi.org.uk/media/', also='',
   why="One of the most useful recent posts is an explainer (\"The NHS Federated Data Platform, the Single Patient Record and the Health Data Research Service – what are they…\"), published as an ordinary blog. A recognisable format for these, starting with the answer, gives the ABPI something journalists and new staff at member companies will come back to.",
   before_cap='An explainer published as an ordinary blog post.',
   after_cap='The same piece in an "Explained" format, answer first.',
   before='''<p class="mock-meta">18 August 2026 · Blog</p><h3>The NHS Federated Data Platform, the Single Patient Record and the Health Data Research Service – what are they, and how do they relate to the UK's pharmaceutical industry?</h3><p>The NHS Federated Data Platform, the Single Patient Record and the Health Data Research Service have become hot topics of discussion in recent times. This…</p>''',
   after='''<div class="explainer"><p class="eyebrow">Explained</p><h3>The Health Data Research Service</h3><p class="lead">[One-sentence answer: what it is and why it matters to medicines research.]</p><ul><li>[Key point]</li><li>[Key point]</li><li>[Key point]</li></ul><p class="chips-row"><a class="chip" href="#">Federated Data Platform</a><a class="chip" href="#">Single Patient Record</a></p><p class="wf-meta">Updated 18 August 2026 · 4 min read</p></div>''')

# ---------------------------------------------------------------------------
# Events
# ---------------------------------------------------------------------------
qw(slug='event-status', theme='events', idea=32,
   title='Show whether an event has places',
   summary='A status label on every event (booking open, few places, full, register interest), driven by one field.',
   url='abpi.org.uk/membership2/events/', also='Also part of prototype 5, Stay informed.',
   why="ABPI Code training is listed as \"now available to book\" while both remaining dates are marked FULL further down its own page, and the Code page lists it under a third date. A single status field, shown on the listing, the event page and the homepage, means they can't disagree.",
   before_cap='Listed as available to book; full when you read on.',
   after_cap='One status, shown everywhere, with a waiting list.',
   before='''<article class="mock-event"><p class="mock-meta">11 May 2026 - 06 November 2026 · 09:30 - 16:00</p><h4>ABPI Code training</h4><p>ABPI Code training delivered by members of the PMCPA Code of Practice Panel is now available to book</p></article><p class="mock-meta">On the event page: "Available dates for 2026 are below: 5 November 2026 - FULL 6 November 2026 - FULL"</p>''',
   after='''<article class="event-card"><div class="event-date" aria-hidden="true"><b>5</b>Nov<br>2026</div><div class="event-body"><p class="event-tags"><span class="badge">Full: waiting list</span><span class="tag">In person</span><span class="tag">Open to all</span></p><h3>ABPI Code training</h3><p class="event-when">5–6 November 2026 · 09:30–16:00 · London Bridge</p><p class="event-desc">A one-day seminar delivered by members of the PMCPA Code of Practice Panel. Both 2026 dates are full.</p></div><div class="event-actions"><a class="btn" href="../pages/events.html">Join waiting list</a></div></article>''')

qw(slug='event-cards', theme='events', idea=33,
   title='Event cards that fit',
   summary='Shorter descriptions on event cards, with format, audience and price shown as labels.',
   url='abpi.org.uk', also='Also part of prototype 5, Stay informed.',
   why="On the homepage the event tiles print their full descriptions, so one long description stretches the whole row to over a thousand pixels tall. Cards say \"Physical Public &amp; Paid\" but not the price. Limiting descriptions to three lines and showing the essentials as labels is a template change.",
   before_cap='Full descriptions; one long one stretches the row.',
   after_cap='Three lines of description, with format, audience and price as labels.',
   before='''<div class="tile-row"><div class="mock-tile"><p class="mock-meta">06 October 2026 09:15 - 16:30 EVENT</p><h4>NICE/DTSU/ABPI Masterclass</h4><p>The NICE/DTSU/ABPI Masterclasses are unique in being focused solely on the specific requirements of NICE and its Appraisal Committees and on the challenges associated with key areas of evidence generation and methodology.</p></div>
<div class="mock-tile"><p class="mock-meta">10 November 2026 08:00 - 16:20 EVENT</p><h4>Global Pharma &amp; Biotech Summit</h4><p>The Global Pharma and Biotech Summit, organised by the Financial Times, brings together the leaders, investors and policymakers shaping the next phase of life sciences. Hear from 60+ expert speakers from organisations including Novartis, GSK, Novo Nordisk, Takeda, Bayer and the Medicines and Healthcare products Regulatory Agency (MHRA) as they explore geopolitical and economic disruption, AI, regulation, market access and the rise of new pharmaceutical innovation hubs.</p></div>
<div class="mock-tile"><p class="mock-meta">22 April 2027 09:30 - 18:30 EVENT</p><h4>SAVE THE DATE - ABPI Annual Conference 2027</h4><p>Save the date for the ABPI Annual Conference 2027, the UK pharmaceutical industry's flagship event bringing together senior leaders, policymakers, clinicians and stakeholders from across the life sciences sector. The conference provides a platform for open dialogue on the issues shaping the future of medicines development, access and innovation in the UK. Full programme details, speakers and session themes will be announced in due course. Check back for updates, or register your interest to be notified as soon as further information is available.</p></div></div>''',
   after='''<div class="tile-row"><div class="mock-tile fit"><p class="event-tags"><span class="badge solid">Few places left</span><span class="tag">In person</span></p><p class="mock-meta">6 October 2026 · 09:15–16:30</p><h4>NICE/DTSU/ABPI Masterclass</h4><p class="event-desc">Focused solely on the requirements of NICE and its Appraisal Committees, and on the challenges in key areas of evidence generation and methodology.</p><p class="event-price"><span class="muted">Price:</span> [£]</p></div>
<div class="mock-tile fit"><p class="event-tags"><span class="badge">Partner event</span><span class="tag">In person</span></p><p class="mock-meta">10–11 November 2026 · 08:00–16:20</p><h4>Global Pharma &amp; Biotech Summit</h4><p class="event-desc">Organised by the Financial Times. Leaders, investors and policymakers on geopolitical and economic disruption, AI, regulation and market access.</p><p class="event-price"><span class="muted">Price:</span> Booked through the organiser</p></div>
<div class="mock-tile fit"><p class="event-tags"><span class="badge">Register interest</span><span class="tag">In person</span></p><p class="mock-meta">22 April 2027 · 09:30–18:30</p><h4>ABPI Annual Conference 2027</h4><p class="event-desc">The UK pharmaceutical industry's flagship event. Programme and speakers to be announced.</p><p class="event-price"><span class="muted">Price:</span> To be announced</p></div></div>''')

ICS = 'data:text/calendar;charset=utf-8,BEGIN%3AVCALENDAR%0D%0AVERSION%3A2.0%0D%0APRODID%3A-%2F%2FABPI%20prototype%2F%2FEN%0D%0ABEGIN%3AVEVENT%0D%0AUID%3Anice-masterclass%40abpi-prototype%0D%0ADTSTART%3A20261006T091500%0D%0ADTEND%3A20261006T163000%0D%0ASUMMARY%3ANICE%2FDTSU%2FABPI%20Masterclass%0D%0ALOCATION%3ALondon%20Bridge%0D%0AEND%3AVEVENT%0D%0AEND%3AVCALENDAR'
qw(slug='booking-panel', theme='events', idea=34,
   title='A clear booking panel with add to calendar',
   summary='Date, time, place and price in one panel, a plain booking button and a calendar file.',
   url='abpi.org.uk/membership2/events/2026/october/nicedtsuabpi-masterclass-evidence-synthesis-for-nice-submissions/', also='Also part of prototype 5, Stay informed.',
   why="Booking currently goes through a link that reads \"VISIT THE WEBSITE HERE!\" (on another event, \"VISIT THE WEBSITE HERE TO BOOK!\"), which doesn't say where it goes. A small panel with the essentials, a button that names the booking system and a calendar file is a template change.",
   before_cap='A capitalised link above the description.',
   after_cap='The essentials in one panel. "Add to calendar" downloads a real calendar file.',
   before='''<p class="mock-meta">06 October 2026 · 09:15 - 16:30 · Physical · Public &amp; Paid</p><h3>NICE/DTSU/ABPI Masterclass: Evidence Synthesis for NICE submissions</h3><p><a href="#" class="caps-link">VISIT THE WEBSITE HERE!</a></p><p>The NICE/DTSU/ABPI Masterclasses are unique in being focused solely on the specific requirements of NICE…</p>''',
   after=f'''<div class="split"><div><h3>NICE/DTSU/ABPI Masterclass: Evidence Synthesis for NICE submissions</h3><p>The NICE/DTSU/ABPI Masterclasses are unique in being focused solely on the specific requirements of NICE…</p></div>
<aside class="panel booking-panel"><dl class="kv"><dt>When</dt><dd>6 October 2026</dd><dt>Time</dt><dd>09:15–16:30</dd><dt>Where</dt><dd>London Bridge</dd><dt>For</dt><dd>Open to all</dd><dt>Price</dt><dd>[£ member / £ non-member]</dd></dl><a class="btn btn-block" href="#">Book on Eventscloud</a><a class="btn btn-secondary btn-block" download="nice-masterclass.ics" href="{ICS}">Add to calendar</a></aside></div>''')

qw(slug='events-address', theme='events', idea=35,
   title='Give events their own address',
   summary='Move events from /membership2/events/ to /events/, with redirects from the old addresses.',
   url='abpi.org.uk/membership2/events/', also='',
   why="Events live at /membership2/events/ and the page title reads \"Events | Membership\", although many of the events are open to everyone. A top-level /events/ section with redirects is a small piece of configuration, and it makes event links read properly when they are shared.",
   before_cap='Events filed under a second membership section.',
   after_cap='A top-level events section, with the old addresses redirected.',
   before='''<div class="addr-bar"><span>https://www.abpi.org.uk/membership2/events/2026/october/nicedtsuabpi-masterclass-evidence-synthesis-for-nice-submissions/</span></div><p class="mock-meta">Page title: Events | Membership</p>''',
   after='''<div class="addr-bar"><span>https://www.abpi.org.uk/events/2026/nice-dtsu-abpi-masterclass-evidence-synthesis/</span></div><p class="mock-meta">Page title: NICE/DTSU/ABPI Masterclass | Events | ABPI</p><table class="url-table"><thead><tr><th scope="col">Old address</th><th scope="col">Redirects to</th></tr></thead><tbody><tr><td>/membership2/events/</td><td>/events/</td></tr><tr><td>/membership2/events/2026/october/nicedtsuabpi-…</td><td>/events/2026/nice-dtsu-abpi-…</td></tr></tbody></table>''')

# ---------------------------------------------------------------------------
# The Code of Practice
# ---------------------------------------------------------------------------
qw(slug='code-page', theme='code', idea=37,
   title='Bring the Code of Practice page up to date',
   summary='Rewrite the 2024 Code page for today, and move the transition notes to an archive.',
   url='abpi.org.uk/reputation/abpi-2024-code-of-practice/', also='',
   why="The page still says printed copies \"will be shipped out from 14 October\", explains the October to December 2024 transition and gives a 28 March 2025 deadline for Disclosure UK data. It was last reviewed in September 2024. The 2024 Code is still current, so this is a rewrite rather than a rebuild, but anyone in the industry checking the rules lands on a page that reads as if nobody has looked at it for two years.",
   before_cap='Copy written for the launch in autumn 2024.',
   after_cap='The same page written for today. Wording for the ABPI and PMCPA to confirm.',
   before=mock_page_head('ABPI 2024 Code of Practice', 'ABPI Website › Building a stronger reputation') + '''<h3>Ordering physical copies of the 2024 ABPI Code of Practice</h3><p>Physical copies of the 2024 ABPI Code are now available to order and will be shipped out from 14 October…</p><p>The 2024 ABPI Code of Practice comes into effect on Tuesday, 1 October 2024. During the period 1 October 2024 to 31 December 2024, no material or activity will be regarded as being in breach of the ABPI Code if it fails to comply with the new requirements of this edition…</p><p>The updated mandatory template for disclosure agreed for the 2024 ABPI Code must be used to submit the 2024 data to Disclosure UK by 14:00 GMT Friday, 28 March 2025.</p><p class="mock-meta">Last reviewed date: 20 September 2024 · Next review date: 20 September 2027</p>''',
   after=mock_page_head('The ABPI Code of Practice', 'ABPI Website › Building a stronger reputation') + '''<p class="lead">The ABPI Code of Practice sets the standards the pharmaceutical industry in the UK must meet when promoting prescription medicines and working with health professionals, patients and the public. The current edition is the 2024 Code.</p>
<div class="hub-tiles"><a class="hub-tile" href="#"><h3>Read the 2024 Code</h3><p>Download the interactive PDF, or read it on the PMCPA website.</p></a><a class="hub-tile" href="../pages/events.html"><h3>Code training</h3><p>One-day seminars with members of the PMCPA Code of Practice Panel.</p></a><a class="hub-tile" href="#"><h3>Order printed copies</h3><p>For UK organisations. Please place one order per company.</p></a></div>
<p class="wf-meta">Last reviewed: [date] · Next review: [date, six months on] · <a href="#">Changes introduced in 2024 (archive)</a></p>''')

# ---------------------------------------------------------------------------
# Accuracy and housekeeping
# ---------------------------------------------------------------------------
qw(slug='review-dates', theme='care', idea=41,
   title='Use the review dates to catch stale pages',
   summary='A report in the CMS listing pages by review date and owner, with shorter cycles for time-sensitive pages.',
   url='abpi.org.uk (Umbraco back office)', also='',
   why="Every content page already carries a \"Last reviewed\" and \"Next review\" date, which is more than most sites manage. Stale copy still gets through: the Code page was last reviewed in September 2024 and isn't due again until 2027. A simple report of what is due, by owner, with six-month cycles for pages that carry dates or deadlines, turns the dates into a working process.",
   before_cap='Review dates sit in each page\'s footer, with nothing that brings them together.',
   after_cap='A report of pages by review date and owner. Owners and some dates are examples.',
   before='''<p class="mock-meta">Last reviewed date: 20 September 2024 · Next review date: 20 September 2027</p><p class="wf-meta">The same two lines appear at the foot of each content page. There is no view across pages.</p>''',
   after='''<div class="table-wrap"><table class="url-table review-table"><thead><tr><th scope="col">Page</th><th scope="col">Owner</th><th scope="col">Cycle</th><th scope="col">Last reviewed</th><th scope="col">Status</th></tr></thead><tbody>
<tr><td>ABPI 2024 Code of Practice</td><td>[Code team]</td><td>6 months</td><td>20 Sep 2024</td><td><span class="badge solid">Overdue</span></td></tr>
<tr><td>Facts, figures and industry data</td><td>[Economics]</td><td>6 months</td><td>[date]</td><td><span class="badge solid">Overdue</span></td></tr>
<tr><td>Membership FAQs</td><td>[Membership]</td><td>12 months</td><td>[date]</td><td><span class="badge">Due in 30 days</span></td></tr>
<tr><td>ABPI Manifesto for Investment, Health and Growth</td><td>[Policy]</td><td>12 months</td><td>[date]</td><td><span class="badge">Archive?</span></td></tr></tbody></table></div>''')

qw(slug='pasted-formatting', theme='care', idea=43,
   title='Strip pasted formatting from page content',
   summary='Clean the About page and set the editor to remove formatting carried in from other tools on paste.',
   url='abpi.org.uk/about-the-abpi/', also='',
   why="On the About page, the questions in the FAQ render in heavy capitals because the text carries formatting pasted in from another tool. Ten elements have it. It's a cleaning job on one page, plus an editor setting so the next paste doesn't do the same.",
   before_cap='FAQ questions in heavy capitals, from pasted formatting.',
   after_cap='The same questions in the site\'s normal style.',
   before='''<h3 class="pasted">WHAT IS THE ABPI AND WHAT DOES IT DO?</h3><p>[Answer]</p><h3 class="pasted">WHO CAN BE A MEMBER OF THE ABPI?</h3><p>[Answer]</p><pre class="code-snip">&lt;h3 class="font-claude-response-body break-words whitespace-normal lead"&gt;</pre>''',
   after='''<div class="accordion"><div class="accordion-item"><button type="button" class="accordion-title" aria-expanded="false">What is the ABPI and what does it do?<span class="accordion-icon">&#9662;</span></button><div class="accordion-content"><p>[Answer]</p></div></div><div class="accordion-item"><button type="button" class="accordion-title" aria-expanded="false">Who can be a member of the ABPI?<span class="accordion-icon">&#9662;</span></button><div class="accordion-content"><p>[Answer]</p></div></div></div><pre class="code-snip">&lt;h3&gt;</pre>''')

qw(slug='page-not-found', theme='care', idea=44,
   title='A better "page not found"',
   summary='Correct the copy, add a search box and popular links, and check broken links each month.',
   url='abpi.org.uk/a-page-that-has-moved/', also='',
   why="The page-not-found page reads \"Here are some recommended pages that may interested you\", then lists the latest news. Its feedback widget has 372 responses, about twice the homepage's 187, which suggests a lot of people end up there. A search box and the pages people most often look for would help them, and a monthly broken-link report would mean fewer arrive.",
   before_cap='A typo, then the latest news.',
   after_cap='Plain copy, a search box and the pages people most often look for.',
   before='''<h3>Page could not be found</h3><p>Here are some recommended pages that may interested you</p><ul class="mock-list"><li>28 August 2026 BLOG · NICE has updated how it values quality of life…</li><li>08 September 2026 NEWS · Green shoots for UK pharma investment…</li><li>20 July 2026 NEWS · ABPI comment on resignation of Lord Vallance</li></ul>''',
   after='''<h3>We can't find that page</h3><p>It may have moved, or the link may be out of date. Try searching, or start from one of these.</p><form class="search-row" role="search" onsubmit="return false"><label class="visually-hidden" for="nf-q">Search the site</label><input type="search" id="nf-q" placeholder="Search abpi.org.uk"><button type="submit" class="btn">Search</button></form>
<ul class="link-grid"><li><a href="../pages/publications.html">Publications</a></li><li><a href="../pages/data.html">Facts and figures</a></li><li><a href="#">ABPI Code of Practice</a></li><li><a href="../pages/members.html">Our members</a></li><li><a href="../pages/events.html">Events</a></li><li><a href="#">Contact us</a></li></ul>''')

qw(slug='tidy-urls', theme='care', idea=45,
   title='Tidy page addresses',
   summary='Replace addresses like /membership2/ and /…-council-1/ with clean ones, and redirect the old ones.',
   url='abpi.org.uk', also='',
   why="Some addresses show the workings of the CMS: /membership2/, /abpi-patient-advisory-council-1/, and a September 2026 news story filed under /2026/august/. Clean addresses with redirects are a small piece of configuration, and they are what people see when a link is shared.",
   before_cap='Addresses as they are today.',
   after_cap='Clean addresses; the old ones redirect.',
   before='''<table class="url-table"><tbody><tr><td>/membership2/abpi-members-list/</td></tr><tr><td>/partnerships/patient-involvement/abpi-patient-advisory-council-1/</td></tr><tr><td>/media/news/2026/august/green-shoots-for-uk-pharma-investment… <span class="muted">(published 8 September)</span></td></tr></tbody></table>''',
   after='''<table class="url-table"><thead><tr><th scope="col">New address</th><th scope="col">Old address redirects here</th></tr></thead><tbody><tr><td>/membership/members/</td><td>/membership2/abpi-members-list/</td></tr><tr><td>/partnerships/patient-involvement/patient-advisory-council/</td><td>…/abpi-patient-advisory-council-1/</td></tr><tr><td>/media/news/2026/september/green-shoots…</td><td>/media/news/2026/august/green-shoots…</td></tr></tbody></table>''')

qw(slug='duplicate-hosts', theme='care', idea=46,
   title='Check for duplicate copies of the site in search results',
   summary='Confirm what the admin., careers. and cancercomparator. addresses serve, and keep only www.abpi.org.uk in search engines.',
   url='Search engine results', also='',
   why="Web searches return copies of the membership page on admin.abpi.org.uk, careers.abpi.org.uk and cancercomparator.abpi.org.uk as well as the main site. We couldn't open those addresses to confirm what they serve, so the first step is a check. If they are copies, redirecting them or hiding them from search engines stops them competing with the real pages.",
   before_cap='Search results as we saw them: the same page on four addresses.',
   after_cap='One result, on the main site. The other addresses redirect or are hidden from search.',
   before='''<div class="serp"><p><b>Membership | ABPI</b><br><span>www.abpi.org.uk › membership</span></p><p><b>Membership | ABPI</b><br><span>admin.abpi.org.uk › membership</span></p><p><b>Membership | ABPI</b><br><span>careers.abpi.org.uk › membership</span></p><p><b>Membership | ABPI</b><br><span>cancercomparator.abpi.org.uk › membership</span></p></div>''',
   after='''<div class="serp"><p><b>Membership | ABPI</b><br><span>www.abpi.org.uk › membership</span><br>We represent our members, using their insight and experience to tell the story of how they change the lives of millions of people every day.</p></div><table class="url-table"><thead><tr><th scope="col">Address</th><th scope="col">Action</th></tr></thead><tbody><tr><td>admin.abpi.org.uk</td><td>[Restrict to staff, or block from search engines]</td></tr><tr><td>careers.abpi.org.uk</td><td>[Redirect to www.abpi.org.uk/careers/]</td></tr><tr><td>cancercomparator.abpi.org.uk</td><td>[Check what it serves]</td></tr></tbody></table>''')

qw(slug='third-party-tools', theme='care', idea=47,
   title='Review the third-party tools on each page',
   summary='List what each external script is for, and remove the ones nobody uses.',
   url='abpi.org.uk', also='',
   why="The homepage calls twelve third-party addresses, including two site-quality tools that seem to do similar jobs (Siteimprove and Silktide), Ahrefs, Google Analytics, a sharing widget, a feedback widget and the search service. Some of these will be essential. Fewer scripts mean faster pages and a simpler cookie banner, and the review itself is a short job.",
   before_cap='External services called by the homepage.',
   after_cap='A review table for the ABPI to complete. Decisions in brackets are examples.',
   before='''<ul class="mock-list host-list"><li>www.googletagmanager.com</li><li>region1.google-analytics.com</li><li>siteimproveanalytics.com</li><li>6136333.global.siteimproveanalytics.io</li><li>analytics.silktide.com</li><li>analytics.ahrefs.com</li><li>cdn-ukwest.onetrust.com</li><li>geolocation.onetrust.com</li><li>customer.cludo.com</li><li>cdn.reactandshare.com</li><li>data.reactandshare.com</li><li>askem.com</li></ul>''',
   after='''<div class="table-wrap"><table class="url-table"><thead><tr><th scope="col">Tool</th><th scope="col">What it does</th><th scope="col">Decision</th></tr></thead><tbody><tr><td>Google Analytics / Tag Manager</td><td>Visitor statistics</td><td>[Keep]</td></tr><tr><td>OneTrust</td><td>Cookie consent</td><td>[Keep]</td></tr><tr><td>Cludo</td><td>Site search</td><td>[Keep]</td></tr><tr><td>Siteimprove</td><td>Site quality checks</td><td>[Keep one of these two]</td></tr><tr><td>Silktide</td><td>Site quality checks</td><td>[Keep one of these two]</td></tr><tr><td>Ahrefs</td><td>Search ranking analytics</td><td>[Check if used]</td></tr><tr><td>React &amp; Share</td><td>Sharing widget</td><td>[Check if used]</td></tr><tr><td>askem</td><td>"Did you find what you were looking for?"</td><td>[Keep]</td></tr></tbody></table></div>''')

qw(slug='welsh-summary', theme='care', idea=48,
   title='A Welsh summary for ABPI Cymru Wales',
   summary='A short Welsh-language summary of the ABPI Cymru Wales page, with a language link between the two.',
   url='abpi.org.uk/abpi-uk-nations/abpi-cymru-wales/', also='',
   why="The ABPI already publishes at least one guide in Welsh (\"Canllaw i ddatblygu a chynhyrchu meddyginiaethau\"), but the ABPI Cymru Wales page is in English only. A short Welsh summary and a language switch is a modest gesture to the stakeholders the Wales team works with.",
   before_cap='The ABPI Cymru Wales page, in English only.',
   after_cap='A language switch and a Welsh summary. The Welsh text is a placeholder for a translator.',
   before=mock_page_head('ABPI Cymru Wales', 'ABPI Website › ABPI UK Nations') + '''<p>ABPI Cymru Wales was established in 2003 in response to the evolving distinctiveness of the post-devolution health and economic agenda in Wales…</p>''',
   after=mock_page_head('ABPI Cymru Wales', 'ABPI Website › ABPI UK Nations') + '''<div class="lang-switch" role="group" aria-label="Language"><span class="on">English</span><a href="#">Cymraeg</a></div><div class="panel"><p class="eyebrow">Crynodeb</p><p>[Welsh-language summary of ABPI Cymru Wales and its work, about 100 words, provided by a translator.]</p></div><p>ABPI Cymru Wales was established in 2003 in response to the evolving distinctiveness of the post-devolution health and economic agenda in Wales…</p>''')

# ---------------------------------------------------------------------------
# Look, feel and accessibility
# ---------------------------------------------------------------------------
qw(slug='button-style', theme='look', idea=50,
   title='One style for buttons',
   summary='One primary and one secondary button style, in sentence case, in place of three styles and two magentas.',
   url='abpi.org.uk', also='',
   why="The homepage alone has at least three button styles: two uppercase versions at different sizes and weights, and a sentence-case one, using two very slightly different magentas. Settling on one primary and one secondary style is a stylesheet change, and it makes every call to action look like it belongs to the same site.",
   before_cap='Three button styles on the homepage.',
   after_cap='One primary and one secondary style, sentence case.',
   before='''<div class="row"><span class="today-btn caps-a">SEE ALL OUR EVENTS</span><span class="today-btn caps-b">ALL PUBLICATIONS</span><span class="today-btn plain">View more facts, figures and industry data</span></div>''',
   after='''<div class="row"><a class="btn" href="#">See all events</a><a class="btn" href="#">All publications</a><a class="btn btn-secondary" href="#">Facts, figures and industry data</a></div>''')

qw(slug='font-names', theme='look', idea=51,
   title='Name the typeface correctly in the stylesheet',
   summary='Rename the "Gilroy" font families to Poppins, which is what the site actually loads.',
   url='abpi.org.uk/assets/styles/styles.min.css', also='',
   why="The stylesheet registers families called GilroyRegular, GilroyBold and so on, but every one of them loads a Poppins file. It looks as if Gilroy was swapped out at some point and the names were left behind. Nobody visiting the site sees the difference, but the next developer or designer to work on it will be misled, so it is worth a small fix and a question about whether Gilroy is still the brand face in print.",
   before_cap='Families named Gilroy that load Poppins.',
   after_cap='Families named for the font they load.',
   before='''<pre class="code-snip">@font-face {
  font-family: GilroyBold;
  src: url("../../assets/fonts/Poppins/Poppins-Bold.ttf");
}
h1 { font-family: GilroyBold; }</pre>''',
   after='''<pre class="code-snip">@font-face {
  font-family: "Poppins";
  font-weight: 700;
  src: url("../../assets/fonts/Poppins/Poppins-Bold.woff2") format("woff2");
}
h1 { font-family: "Poppins", sans-serif; font-weight: 700; }</pre>''')

qw(slug='heading-order', theme='look', idea=54,
   title='Headings in the right order',
   summary='Fix the heading levels on the homepage so screen readers and search engines read the structure correctly.',
   url='abpi.org.uk', also='',
   why="On the homepage, the main heading is followed by a level-3 strapline before the first level-2 heading, and card titles skip levels. People using screen readers navigate by headings, so the order matters to them. It is a template fix, and a natural part of an accessibility review.",
   before_cap='The heading outline of the homepage today.',
   after_cap='The same page with headings in order.',
   before='''<ol class="outline"><li><code>h1</code> The Association of the British Pharmaceutical Industry</li><li class="l3 bad"><code>h3</code> MEDICINES ARE TRANSFORMING OUR LIVES LIKE NEVER BEFORE.</li><li class="l2"><code>h2</code> Latest news and blogs</li><li class="l3"><code>h3</code> Green shoots for UK pharma investment…</li><li class="l4 bad"><code>h4</code> NICE/DTSU/ABPI Masterclass (event, no h2 or h3 above it)</li><li class="l3 bad"><code>h3</code> Economic statistics (under no h2)</li></ol>''',
   after='''<ol class="outline"><li><code>h1</code> The Association of the British Pharmaceutical Industry</li><li class="l2"><code>p</code> Medicines are transforming our lives like never before.</li><li class="l2"><code>h2</code> Latest news and blogs</li><li class="l3"><code>h3</code> Green shoots for UK pharma investment…</li><li class="l2"><code>h2</code> Events</li><li class="l3"><code>h3</code> NICE/DTSU/ABPI Masterclass</li><li class="l2"><code>h2</code> Economic statistics</li></ol>''')


# ---------------------------------------------------------------------------
# Writers
# ---------------------------------------------------------------------------
HEAD = '''<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} — ABPI quick wins</title>
  <link rel="stylesheet" href="~/css/base.css">
  <link rel="stylesheet" href="~/css/components.css">
  <link rel="stylesheet" href="~/css/theme.css">
</head>
'''
FOOT = '''  <!-- @@include footer.html -->
  <script src="~/js/data.js"></script>
  <script src="~/js/quick-wins.js"></script>
  <script src="~/js/wireframe.js"></script>
  <script src="~/js/photos.js"></script>
</body>
</html>
'''


def write_page(i, q):
    n = i + 1
    theme_name = dict(THEMES)[q['theme']]
    also = f'<p class="qw-where">{escape(q["also"])}</p>' if q.get('also') else ''
    html = HEAD.format(title=escape(q['title'])) + f'''<body data-qw-theme="{q['theme']}">
  <!-- @@include header.html -->

  <main id="main" class="flush">
    <!-- What we're proposing and why (shown when Notes are on) -->
    <aside class="proposal" aria-label="About this quick win">
      <div class="container">
        <p class="proposal-eyebrow">Quick win {n} of {len(QW)} · {escape(theme_name)}</p>
        <div class="proposal-grid">
          <div><h2>What we're proposing</h2><p>{escape(q['summary'])}</p></div>
          <div><h2>Why</h2><p>{q['why']}</p></div>
        </div>
      </div>
    </aside>

    <!-- QW{n}: {escape(q['title'])} (R-QW{n}, idea #{q['idea']}) -->
    <div class="qw-head">
      <div class="container">
        <p class="qw-num">QW{n} · {escape(theme_name)}</p>
        <h1>{escape(q['title'])}</h1>
        <p class="lead">{escape(q['summary'])}</p>
        {also}
      </div>
    </div>

    <div data-ba>
      <div class="ba-bar">
        <div class="container">
          <div class="ba-switch" role="group" aria-label="Compare">
            <button type="button" data-ba-show="before" aria-pressed="true">Today</button>
            <button type="button" data-ba-show="after" aria-pressed="false">Proposed</button>
          </div>
          <span class="ba-hint">Switch between the site as it is and the change. Arrow keys work too.</span>
        </div>
      </div>
      <div class="container ba-stage">
        <div class="ba-before">
          <p class="ba-caption"><b>Today</b><span>{escape(q['before_cap'])}</span></p>
          <div class="ba-frame"><div class="ba-frame-bar"><i></i><i></i><i></i><span>{escape(q['url'])}</span></div>
            <div class="ba-frame-body">
{q['before']}
            </div>
          </div>
        </div>
        <div class="ba-after" hidden>
          <p class="ba-caption"><b>Proposed</b><span>{escape(q['after_cap'])}</span></p>
          <div class="ba-frame"><div class="ba-frame-bar"><i></i><i></i><i></i><span>{escape(q['url'])}</span></div>
            <div class="ba-frame-body">
{q['after']}
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

''' + FOOT
    with open(os.path.join(OUT, q['slug'] + '.html'), 'w') as fh:
        fh.write(html)


def write_index():
    sections = ''
    for key, name in THEMES:
        items = [(i, q) for i, q in enumerate(QW) if q['theme'] == key]
        if not items:
            continue
        cards = ''.join(f'''
            <li class="qw-card">
              <span class="qw-n">QW{i + 1}</span>
              <h3><a href="{q['slug']}.html">{escape(q['title'])}</a></h3>
              <p>{escape(q['summary'])}</p>
              <p class="qw-try"><strong>Try:</strong> {escape(q.get('try') or 'switch between Today and Proposed.')}</p>
              {f'<p class="qw-also">{escape(q["also"])}</p>' if q.get('also') else ''}
              <a class="btn btn-sm" href="{q['slug']}.html">Open quick win<span class="visually-hidden"> {i + 1}</span></a>
            </li>''' for i, q in items)
        sections += f'''
      <section class="qw-theme" id="{key}" aria-labelledby="t-{key}">
        <h2 class="section-title" id="t-{key}">{escape(name)}</h2>
        <ul class="qw-grid">{cards}
        </ul>
      </section>
'''
    html = HEAD.format(title='All quick wins').replace(' — ABPI quick wins', ' — ABPI prototypes') + f'''<body class="qw-index">
  <!-- @@include header.html -->

  <main id="main" class="flush">
    <!-- Quick wins overview (R06) -->
    <div class="page-head">
      <div class="container">
        <p class="eyebrow">Quick wins</p>
        <h1>{len(QW)} smaller changes</h1>
        <p class="lead">Each of these is shown on its own, against abpi.org.uk as it is today. Any of them can be made independently of the five big improvements, and of each other.</p>
        <p>Open one, then switch between <strong>Today</strong> and <strong>Proposed</strong>. Switch <strong>Notes on</strong> to see why we suggest it.</p>
      </div>
    </div>
    <div class="container pad-top">
{sections}
    </div>
  </main>

''' + FOOT
    with open(os.path.join(OUT, 'index.html'), 'w') as fh:
        fh.write(html)


def write_data():
    data = [{'slug': q['slug'], 'title': q['title'], 'theme': q['theme'], 'idea': q['idea']} for q in QW]
    with open(os.path.join(ROOT, 'src', 'js', 'quick-wins.js'), 'w') as fh:
        fh.write('/* Generated by tools/quick_wins.py: the ordered list of quick wins, used for previous/next links. */\n')
        fh.write('window.ABPI_QUICK_WINS = ' + json.dumps(data, ensure_ascii=False, indent=1) + ';\n')


def write_requirements():
    """Append (or replace) the quick-wins section of requirements.md."""
    path = os.path.join(ROOT, 'requirements', 'requirements.md')
    with open(path) as fh:
        text = fh.read()
    marker = '\n## Quick wins'
    if marker in text:
        text = text[:text.index(marker)]
    lines = [marker + ' (QW1–QW%d, phase 3)' % len(QW),
             'Each quick win is a standalone demo with a Today / Proposed switch (R07). Idea numbers refer to the Opportunities page.']
    for i, q in enumerate(QW):
        lines.append(f'- QW{i + 1} {q["title"]} (#{q["idea"]}) — quick-wins/{q["slug"]}.html')
    with open(path, 'w') as fh:
        fh.write(text.rstrip('\n') + '\n' + '\n'.join(lines) + '\n')


TRY = {
    'membership-checker': 'switch to Proposed and answer the three questions.',
    'membership-menu': 'switch to Proposed and open the Membership menu.',
    'member-login': 'switch to Proposed and open "Member area".',
    'email-signup': 'switch to Proposed and submit the form empty, then with an email.',
    'glossary-popovers': 'switch to Proposed and click "PMCPA".',
    'booking-panel': 'switch to Proposed and use "Add to calendar".',
    'pasted-formatting': 'switch to Proposed and open a question.',
    'fix-facts-page': 'compare the captions and the reference list.',
    'publication-themes': 'compare the length of the two lists.',
}

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    order = [k for k, _ in THEMES]
    QW.sort(key=lambda q: order.index(q['theme']))
    for q in QW:
        if q['slug'] in TRY:
            q['try'] = TRY[q['slug']]
    for name in os.listdir(OUT):
        if name.endswith('.html'):
            os.remove(os.path.join(OUT, name))
    for i, q in enumerate(QW):
        write_page(i, q)
    write_index()
    write_data()
    write_requirements()
    print(f'Wrote {len(QW)} quick wins and the index to src/quick-wins/')
