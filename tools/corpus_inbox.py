"""Inbox corpus for the local-runbook demo.

Every message here is synthetic. No real person, address, or account.

Design notes:

- The eight `category` values from SPEC.md are all represented, with enough
  ambiguity that a keyword rule misfires. "I'm not angry, just disappointed the
  invoice came twice" reads as a complaint and is actually a billing error.
- Sensitive messages are NOT segregated. They sit in the same folder in filename
  order, so triage is what surfaces them rather than the folder layout.
- `planted` entries are ground truth for the survival scan and never appear in
  any prompt.
"""

REFERENCE_DATE = "2026-08-27"

# ---------------------------------------------------------------------------
# name, from_name, from_addr, subject, date, category, urgency, owner,
# pii, planted[], body
# ---------------------------------------------------------------------------

EMAILS = [
    dict(
        name="001-duplicate-invoice.eml",
        from_name="Dana Kirkwood", from_addr="dana@bellweatherstudio.example",
        subject="Re: Invoice 20841 - I think this came twice",
        date="Mon, 24 Aug 2026 08:12:03 -0400",
        category="invoice_dispute", urgency="this_week", owner="finance",
        pii=False, planted=[],
        body="""Hi,

I'm not angry, just a bit disappointed that the invoice came through twice this
month. We paid 20841 on the 3rd by ACH and then 20841-A landed yesterday for
the same amount and the same line items.

I don't think anyone did anything wrong, I'd just like the second one voided
before it ages into your collections run. Happy to forward the bank
confirmation if that helps.

Thanks,
Dana Kirkwood
Bellweather Studio
""",
    ),
    dict(
        name="002-order-arrived-damaged.eml",
        from_name="Marcus Oyelaran", from_addr="m.oyelaran@fieldnotesco.example",
        subject="Order 55219 arrived with two damaged units",
        date="Mon, 24 Aug 2026 09:41:55 -0400",
        category="customer_complaint", urgency="today", owner="support",
        pii=False, planted=[],
        body="""Order 55219 arrived this morning. Eight of the ten insulated carriers are
fine. Two have crushed side panels, looks like transit damage rather than
anything on your end.

The problem is timing. These are going out to a corporate client on Thursday
and I need replacements before then or I have to tell them we're short. If you
can't get two out today I'd rather know now so I can source locally.

Photos attached.

Marcus
""",
    ),
    dict(
        name="003-hr-escalation-confidential.eml",
        from_name="Alicia Brennan", from_addr="a.brennan@cedarridge.example",
        subject="Confidential - concern about conduct on the warehouse floor",
        date="Fri, 21 Aug 2026 17:22:10 -0400",
        category="internal_hr", urgency="today", owner="people_ops",
        pii=True,
        planted=[
            ("Devon Mackey", "person_name"),
            ("Alicia Brennan", "person_name"),
            ("her son is being treated for epilepsy at St. Aubin Children's", "medical_detail"),
            ("904-555-0143", "phone"),
            ("was written up twice in 2024 for the same behaviour", "employment_detail"),
        ],
        body="""Please treat this as confidential.

I need to raise a concern about Devon Mackey on the second shift. Over the past
three weeks he has made repeated comments about Renata's schedule changes in
front of other staff. She has been leaving early on Tuesdays because her son is
being treated for epilepsy at St. Aubin Children's, which she disclosed to me in
confidence and which I have not shared with the floor.

I checked the personnel file and Devon was written up twice in 2024 for the same
behaviour, so this is not new.

Renata has not filed anything herself and I do not want to put her in that
position. I would like to talk through options before this escalates on its own.
You can reach me directly at 904-555-0143 rather than through the shared line.

Alicia Brennan
Shift Supervisor
""",
    ),
    dict(
        name="004-vendor-quote-packaging.eml",
        from_name="Sunil Bhatt", from_addr="sbhatt@arborpack.example",
        subject="Quote 8871 - corrugated inserts, 5k and 10k tiers",
        date="Tue, 18 Aug 2026 11:05:44 -0400",
        category="vendor_quote", urgency="no_deadline", owner="none",
        pii=False, planted=[],
        body="""As discussed, pricing for the custom corrugated inserts:

5,000 units   $1.42 each
10,000 units  $1.19 each
25,000 units  $0.97 each

Tooling is a one-time $2,400 and we hold the die for three years. Lead time is
fifteen business days from artwork approval, and we're quoting the recycled
board you asked about, not virgin.

Quote holds for thirty days. No rush from our side.

Sunil Bhatt
Arbor Pack
""",
    ),
    dict(
        name="005-job-application-warehouse.eml",
        from_name="Theo Vandersloot", from_addr="theo.vandersloot@mailbox.example",
        subject="Application - Warehouse Associate posting",
        date="Wed, 19 Aug 2026 14:33:12 -0400",
        category="job_application", urgency="no_deadline", owner="people_ops",
        pii=False, planted=[],
        body="""Hello,

I'm applying for the Warehouse Associate role posted last week. I've spent four
years in fulfilment, the last two running a pick line of six people, and I hold
a current forklift certification.

I'm local and available on two weeks notice. Resume attached.

Thank you for your time,
Theo Vandersloot
""",
    ),
    dict(
        name="006-sales-inquiry-wholesale.eml",
        from_name="Priyanka Deshmukh", from_addr="p.deshmukh@northgateoutdoor.example",
        subject="Wholesale terms for a 40 store rollout?",
        date="Thu, 20 Aug 2026 10:17:29 -0400",
        category="sales_inquiry", urgency="this_week", owner="sales",
        pii=False, planted=[],
        body="""We're a regional outdoor retailer with 40 locations and we're rebuilding our
soft goods assortment for spring.

Two questions before we go further. Do you do wholesale at that volume, and do
you support drop ship to individual stores or is it distribution centre only?

We'd be looking at an initial commitment in the range of 3,000 to 4,000 units
across four SKUs, with a decision in September.

Priyanka Deshmukh
Category Manager, Northgate Outdoor
""",
    ),
    dict(
        name="007-support-login-loop.eml",
        from_name="Greg Halloway", from_addr="ghalloway@summitretail.example",
        subject="Dealer portal keeps logging me out",
        date="Mon, 24 Aug 2026 07:58:01 -0400",
        category="support_request", urgency="this_week", owner="support",
        pii=False, planted=[],
        body="""Since Friday the dealer portal signs me out roughly every ninety seconds. It
happens on two different machines and on my phone, so I don't think it's a
browser thing on my end.

Not urgent enough to call anyone at home over, but I can't place a reorder until
it's fixed and I'd like to get one in this week.

Greg Halloway
Summit Retail
""",
    ),
    dict(
        name="008-spam-seo.eml",
        from_name="Growth Team", from_addr="outreach@rankboost-pro.example",
        subject="Re: Re: quick question about cedarridge.example rankings",
        date="Sat, 22 Aug 2026 03:14:07 +0000",
        category="spam", urgency="no_deadline", owner="none",
        pii=False, planted=[],
        body="""Hi there,

I was analyzing cedarridge.example and noticed you are missing out on 14,000
monthly visitors due to technical SEO issues.

We have helped 400+ brands achieve first page rankings in 90 days GUARANTEED.
Would you be open to a quick 15 minute call this week?

Reply STOP to unsubscribe.

Best regards,
Growth Team
""",
    ),
    dict(
        name="009-complaint-wrong-size.eml",
        from_name="Bethany Prowse", from_addr="bprowse@mailbox.example",
        subject="This is the second time you've sent the wrong size",
        date="Sun, 23 Aug 2026 19:44:52 -0400",
        category="customer_complaint", urgency="this_week", owner="support",
        pii=False, planted=[],
        body="""Second time now. I ordered a large, I received a medium, I returned the medium,
and the replacement is also a medium.

I've been a customer for six years and I've never had to write in before, so
this isn't me being difficult. But I'd like an actual large or a refund
including what I paid to ship the first return back.

Bethany Prowse
""",
    ),
    dict(
        name="010-invoice-po-mismatch.eml",
        from_name="Accounts Payable", from_addr="ap@harborpointcommercial.example",
        subject="Invoice 20903 does not match PO 4471",
        date="Fri, 21 Aug 2026 13:02:38 -0400",
        category="invoice_dispute", urgency="this_week", owner="finance",
        pii=False, planted=[],
        body="""Invoice 20903 is for $8,140. Purchase order 4471 authorises $7,800.

The $340 difference appears to be a freight line that the PO does not cover. Our
system will reject the invoice automatically at month end, so we need either a
corrected invoice or a PO amendment from your side before the 31st.

Accounts Payable
Harbor Point Commercial
""",
    ),
    dict(
        name="011-support-integration-docs.eml",
        from_name="Wes Ndiaye", from_addr="wes@thistleandpine.example",
        subject="Where do I find the inventory webhook payload format?",
        date="Wed, 19 Aug 2026 16:20:11 -0400",
        category="support_request", urgency="no_deadline", owner="support",
        pii=False, planted=[],
        body="""Looking for documentation on the inventory webhook. The dealer portal mentions
it under integrations but the link goes to a 404.

Specifically I want to know whether the payload sends absolute stock counts or
deltas, because that changes how I write the consumer.

No rush, this is a side project for us this quarter.

Wes
""",
    ),
    dict(
        name="012-customer-medical-context.eml",
        from_name="Rosalind Achebe", from_addr="r.achebe@mailbox.example",
        subject="Need to change my delivery address urgently",
        date="Mon, 24 Aug 2026 06:31:19 -0400",
        category="support_request", urgency="today", owner="support",
        pii=True,
        planted=[
            ("Rosalind Achebe", "person_name"),
            ("882 Ashgrove Lane, Unit 12", "street_address"),
            ("904-555-0198", "phone"),
            ("I'm being admitted for a hip replacement on Wednesday", "medical_detail"),
            ("acct 4471-88213", "account_id"),
        ],
        body="""Please change the delivery address on my standing order, acct 4471-88213.

I'm being admitted for a hip replacement on Wednesday and I'll be at my
daughter's place for six weeks afterwards. Send everything to 882 Ashgrove Lane,
Unit 12 until the middle of October, then back to the usual address.

If there's a problem call me today on 904-555-0198 because after Wednesday I
won't be reachable for a couple of days.

Rosalind Achebe
""",
    ),
    dict(
        name="013-sales-inquiry-custom.eml",
        from_name="Ingrid Salvesen", from_addr="ingrid@fjordworks.example",
        subject="Custom colourway for a corporate gifting run",
        date="Thu, 20 Aug 2026 15:48:03 -0400",
        category="sales_inquiry", urgency="no_deadline", owner="sales",
        pii=False, planted=[],
        body="""Do you do custom colourways at low volume? We need about 250 units in a
specific corporate blue for a client gifting programme in November.

If 250 is below your minimum, tell me what the minimum is and I'll see whether
we can justify it.

Ingrid Salvesen
Fjordworks
""",
    ),
    dict(
        name="014-spam-invoice-phish.eml",
        from_name="DocuShare Secure", from_addr="no-reply@docushare-delivery.example",
        subject="You have 1 pending document (ACTION REQUIRED)",
        date="Sat, 22 Aug 2026 11:09:44 +0000",
        category="spam", urgency="no_deadline", owner="none",
        pii=False, planted=[],
        body="""A document has been shared with you and is awaiting your signature.

Document: Remittance_Advice_Aug.pdf
Expires in: 24 hours

CLICK HERE TO VIEW DOCUMENT

If you do not recognise this request please ignore this message. Do not reply to
this address as it is not monitored.
""",
    ),
    dict(
        name="015-vendor-quote-freight.eml",
        from_name="Curtis Oyelowo", from_addr="c.oyelowo@pinnaclefreight.example",
        subject="Revised LTL rates effective October",
        date="Tue, 18 Aug 2026 09:26:57 -0400",
        category="vendor_quote", urgency="this_week", owner="finance",
        pii=False, planted=[],
        body="""Attaching the revised LTL schedule that takes effect October 1.

Headline: lanes into the southeast are down about four percent, lanes to the
upper midwest are up eleven because of the carrier consolidation you probably
read about. Net effect on your mix last quarter would have been roughly plus two
percent.

If you want to lock the current schedule for another six months we can do that
but it needs signing before September 15.

Curtis
Pinnacle Freight
""",
    ),
    dict(
        name="016-complaint-tone-ambiguous.eml",
        from_name="Hal Winterbourne", from_addr="hal@winterbournegoods.example",
        subject="Great product, terrible experience getting it",
        date="Fri, 21 Aug 2026 08:55:22 -0400",
        category="customer_complaint", urgency="this_week", owner="support",
        pii=False, planted=[],
        body="""I want to be clear that the product is excellent and we will keep buying it.

Getting it here was another matter. Three different ship dates, two of which I
found out had slipped only because I called, and a tracking number that pointed
at someone else's shipment for a full day.

I'm not asking for money back. I'm telling you because if you're doing this to
accounts smaller than mine they're just leaving quietly.

Hal Winterbourne
""",
    ),
    dict(
        name="017-job-application-referral.eml",
        from_name="Naomi Castellanos", from_addr="n.castellanos@mailbox.example",
        subject="Referred by Alicia Brennan - operations coordinator role",
        date="Mon, 24 Aug 2026 10:02:44 -0400",
        category="job_application", urgency="no_deadline", owner="people_ops",
        pii=False, planted=[],
        body="""Alicia Brennan suggested I reach out about the operations coordinator opening.

I've run scheduling and inbound receiving for a 60 person distribution site for
three years, and before that I did the same at a smaller site. Alicia and I
worked together at the previous site so she can speak to the work directly.

Resume attached. Available to talk any afternoon.

Naomi Castellanos
""",
    ),
    dict(
        name="018-internal-hr-benefits.eml",
        from_name="Yusuf Karim", from_addr="y.karim@cedarridge.example",
        subject="Open enrolment window - do we need to move it?",
        date="Wed, 19 Aug 2026 12:41:30 -0400",
        category="internal_hr", urgency="this_week", owner="people_ops",
        pii=False, planted=[],
        body="""Broker says the carrier moved the plan year start, which pushes our open
enrolment window two weeks earlier than we announced internally.

We've already told staff October 1 through 15. If the carrier is firm we need to
re-announce, and I'd rather do that once with correct dates than twice.

Can we get twenty minutes this week to decide?

Yusuf
""",
    ),
    dict(
        name="019-support-return-label.eml",
        from_name="Delphine Rousseau", from_addr="d.rousseau@mailbox.example",
        subject="Return label never arrived",
        date="Thu, 20 Aug 2026 17:39:18 -0400",
        category="support_request", urgency="this_week", owner="support",
        pii=False, planted=[],
        body="""I requested a return label on the 14th and was told it would come by email
within 48 hours. It hasn't arrived and it isn't in spam.

The return window closes on the 31st according to your policy page, so I want to
make sure this doesn't count against me while I wait.

Delphine Rousseau
""",
    ),
    dict(
        name="020-invoice-credit-note.eml",
        from_name="Bookkeeping", from_addr="books@cedarridgeretail.example",
        subject="Credit note 331 still not applied",
        date="Mon, 24 Aug 2026 08:47:52 -0400",
        category="invoice_dispute", urgency="today", owner="finance",
        pii=False, planted=[],
        body="""Credit note 331 for $1,910 was issued in June and still has not been applied
against the account. Two subsequent statements show the full balance.

Our auditor is reviewing the aged payables file on Wednesday and this will come
up. I need either the credit applied or a written explanation of why it wasn't
before then.

Bookkeeping
""",
    ),
    dict(
        name="021-sales-inquiry-tiny.eml",
        from_name="Omar Haddad", from_addr="omar@thecornershopllc.example",
        subject="Do you sell to single location shops?",
        date="Sat, 22 Aug 2026 14:12:09 -0400",
        category="sales_inquiry", urgency="no_deadline", owner="sales",
        pii=False, planted=[],
        body="""Small question. I run one shop, not a chain. Your site talks about dealer
accounts and minimums and I couldn't tell whether that means I'm too small.

If there's a starter tier I'd like to hear about it. If not, no hard feelings,
just say so and I'll stop checking the page.

Omar Haddad
""",
    ),
    dict(
        name="022-vendor-quote-insurance.eml",
        from_name="Lorraine Whitcombe", from_addr="l.whitcombe@kestrelbrokers.example",
        subject="General liability renewal quote - three carrier options",
        date="Tue, 18 Aug 2026 16:07:41 -0400",
        category="vendor_quote", urgency="this_week", owner="finance",
        pii=False, planted=[],
        body="""Three options for the general liability renewal, all at the same limits:

Carrier A  $14,200  no change to terms
Carrier B  $12,850  adds a $5,000 deductible per occurrence
Carrier C  $15,900  includes the products extension you asked about last year

The current policy lapses September 30, so I need a direction by the 12th to
bind cleanly without a gap.

Lorraine Whitcombe
Kestrel Brokers
""",
    ),
    dict(
        name="023-complaint-escalation-threat.eml",
        from_name="Duncan Pryce", from_addr="dpryce@pryceandsons.example",
        subject="Fourth email. Someone please respond.",
        date="Mon, 24 Aug 2026 07:04:16 -0400",
        category="customer_complaint", urgency="today", owner="support",
        pii=False, planted=[],
        body="""This is my fourth email in eleven days about order 54880 and I have not had a
reply from a human once.

The order is $16,400. It is three weeks late. I have a customer waiting on it
who is now asking me the same questions I am asking you and I have nothing to
tell them.

If I don't hear from someone today I'm going to dispute the charge and source it
elsewhere, and I'd rather not because we've done business for nine years.

Duncan Pryce
Pryce and Sons
""",
    ),
    dict(
        name="024-spam-recruiter-blast.eml",
        from_name="Talent Solutions", from_addr="candidates@apexstaffing-global.example",
        subject="Pre-vetted warehouse candidates available immediately",
        date="Sun, 23 Aug 2026 22:41:03 +0000",
        category="spam", urgency="no_deadline", owner="none",
        pii=False, planted=[],
        body="""Hello,

We have 200+ PRE-VETTED warehouse and logistics candidates ready to start
IMMEDIATELY in your area.

No upfront fees. Pay only on successful placement. Our AI matching engine
reduces time to hire by 70%.

Book a slot on my calendar: [link]

Talent Solutions
Apex Staffing Global
""",
    ),
    dict(
        name="025-internal-hr-payroll-detail.eml",
        from_name="Payroll", from_addr="payroll@cedarridge.example",
        subject="Garnishment order received - need handling instruction",
        date="Fri, 21 Aug 2026 15:33:27 -0400",
        category="internal_hr", urgency="today", owner="people_ops",
        pii=True,
        planted=[
            ("Trevor Lindqvist", "person_name"),
            ("emp id 88-4412", "account_id"),
            ("a wage garnishment order for unpaid child support", "employment_detail"),
            ("41 Marlowe Terrace", "street_address"),
        ],
        body="""We received a court order this morning affecting Trevor Lindqvist, emp id
88-4412.

It is a wage garnishment order for unpaid child support, effective with the
next pay run. The order specifies 18 percent of disposable earnings and lists
his address of record as 41 Marlowe Terrace, which does not match what we have
on file.

Payroll closes Tuesday. I need written instruction on whether to apply it this
cycle or next, and someone needs to confirm the address discrepancy before we
send any notice to him.

Payroll
""",
    ),
]


def summary():
    from collections import Counter
    return {
        "total": len(EMAILS),
        "by_category": dict(Counter(e["category"] for e in EMAILS)),
        "by_urgency": dict(Counter(e["urgency"] for e in EMAILS)),
        "with_personal_data": sum(1 for e in EMAILS if e["pii"]),
        "planted_identifiers": sum(len(e["planted"]) for e in EMAILS),
    }
