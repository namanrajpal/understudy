"""Contract corpus for the local-runbook demo.

Every document here is synthetic. No real company, person, or agreement.

The load-bearing design decision is `renewal_basis`. A regex can find an
explicit date. It cannot work out that "renews on each anniversary of the
Effective Date" means the answer is computed from a date stated in a different
paragraph, or that "coterminous with Client's fiscal year" means the answer is
in a sentence that contains no date at all.

Several contracts that genuinely expire inside the 90-day window are written
behind exactly that construction, so the baseline in tools/baseline_regex.py
misses them and the local model finds them.

REFERENCE_DATE is pinned so the corpus and its ground truth stay reproducible.
"""

REFERENCE_DATE = "2026-08-27"  # talk day. 90-day window closes 2026-11-25.

# ---------------------------------------------------------------------------
# Each entry: filename, doc_type, counterparty, renewal_basis, renewal_date,
# notice_days, expires_within_90_days, contains_personal_data, planted[], body
#
# The truth fields are ground truth for scoring, NOT shown to any model.
# ---------------------------------------------------------------------------

CONTRACTS = [
    # -- fixed_date: the easy class. A regex can get these. ----------------
    dict(
        name="001-service-agreement-northwind.txt",
        # janitorial and grounds upkeep. "recurring servicing, support, or
        # upkeep of equipment, premises, or systems" is the maintenance
        # definition in the runbook, so maintenance is the correct label here.
        doc_type="maintenance", counterparty="Northwind Facilities Group",
        renewal_basis="fixed_date", renewal_date="2026-10-31",
        notice_days=0, expires=True, pii=False, planted=[],
        body="""MASTER SERVICES AGREEMENT

Between: Cedar Ridge Outfitters LLC ("Client")
And:     Northwind Facilities Group ("Provider")

1. TERM
This Agreement commences on November 1, 2024 and expires on October 31, 2026.
The Agreement does not renew automatically. Any continuation of services beyond
the expiration date requires a new written agreement executed by both parties.

2. SERVICES
Provider shall furnish janitorial and grounds maintenance services to the
Client premises on a weekly schedule.

3. FEES
Client shall pay Provider $4,200 per month, invoiced on the first business day
of each month, payable net thirty (30) days.

4. TERMINATION FOR CONVENIENCE
Either party may terminate this Agreement upon ninety (90) days written notice.
""",
    ),
    dict(
        name="002-saas-subscription-brightledger.txt",
        doc_type="saas_subscription", counterparty="BrightLedger Software Inc.",
        renewal_basis="fixed_date", renewal_date="2026-09-15",
        notice_days=0, expires=True, pii=False, planted=[],
        body="""SUBSCRIPTION ORDER FORM

Customer:  Cedar Ridge Outfitters LLC
Vendor:    BrightLedger Software Inc.
Product:   BrightLedger Accounting, Business tier
Seats:     14

SUBSCRIPTION PERIOD
Start date: September 16, 2024
End date:   September 15, 2026

This Order Form covers a fixed twenty-four (24) month subscription period. The
subscription terminates on the end date stated above unless the parties execute
a renewal Order Form.

FEES
$1,150.00 per month for the subscription period. Overage seats billed at $82
per seat per month.
""",
    ),
    dict(
        name="003-lease-harbor-point.txt",
        doc_type="lease", counterparty="Harbor Point Commercial Properties",
        renewal_basis="fixed_date", renewal_date="2028-02-29",
        notice_days=0, expires=False, pii=False, planted=[],
        body="""COMMERCIAL LEASE AGREEMENT

Landlord: Harbor Point Commercial Properties
Tenant:   Cedar Ridge Outfitters LLC
Premises: Unit 4, 1820 Kestrel Avenue

TERM
The term of this Lease is four (4) years, commencing March 1, 2024 and ending
February 29, 2028.

RENT
Base rent of $7,800 per month, escalating three percent (3%) on each March 1
during the term.

OPTION TO EXTEND
Tenant holds one option to extend for an additional three (3) year term,
exercisable by written notice delivered no later than one hundred eighty (180)
days before the end of the initial term.
""",
    ),
    dict(
        name="004-maintenance-summit-hvac.txt",
        doc_type="maintenance", counterparty="Summit Mechanical Services",
        renewal_basis="fixed_date", renewal_date="2027-06-30",
        notice_days=0, expires=False, pii=False, planted=[],
        body="""EQUIPMENT MAINTENANCE CONTRACT

Contractor: Summit Mechanical Services
Owner:      Cedar Ridge Outfitters LLC

COVERAGE PERIOD
July 1, 2025 through June 30, 2027.

SCOPE
Quarterly preventive maintenance on two rooftop HVAC units, including filter
replacement, coil cleaning, and refrigerant pressure verification. Emergency
call-out response within eight (8) business hours.

CONSIDERATION
$2,600 annually, invoiced in two equal installments.
""",
    ),
    dict(
        name="005-sow-tidewater-analytics.txt",
        doc_type="statement_of_work", counterparty="Tidewater Analytics LLC",
        renewal_basis="fixed_date", renewal_date="2026-11-13",
        notice_days=0, expires=True, pii=False, planted=[],
        body="""STATEMENT OF WORK NO. 3

Issued under the Master Consulting Agreement dated January 8, 2025.

Consultant: Tidewater Analytics LLC
Client:     Cedar Ridge Outfitters LLC

PERIOD OF PERFORMANCE
This Statement of Work begins May 14, 2026 and concludes November 13, 2026.

DELIVERABLES
1. Demand forecasting model for seasonal inventory
2. Two written findings memoranda
3. One half-day handover session with Client staff

COMPENSATION
Fixed fee of $48,000, invoiced in three milestone payments.
""",
    ),
    dict(
        name="006-service-agreement-pinnacle.txt",
        doc_type="service_agreement", counterparty="Pinnacle Freight Partners",
        renewal_basis="fixed_date", renewal_date="2029-01-31",
        notice_days=0, expires=False, pii=False, planted=[],
        body="""LOGISTICS SERVICES AGREEMENT

Carrier: Pinnacle Freight Partners
Shipper: Cedar Ridge Outfitters LLC

TERM
Five (5) years from February 1, 2024, expiring January 31, 2029.

RATES
Rates are fixed for the first twenty-four (24) months and thereafter adjust
annually by the change in the published diesel index, capped at five percent
(5%) per adjustment.
""",
    ),

    # -- anniversary_of_execution: the regex killer. -----------------------
    # The renewal date is NOT written anywhere. It must be computed from the
    # execution date, which appears in the signature block in longhand.
    dict(
        name="007-service-agreement-alder-creek.txt",
        doc_type="service_agreement", counterparty="Alder Creek Security Systems",
        renewal_basis="anniversary_of_execution", renewal_date="2026-09-18",
        notice_days=30, expires=True, pii=False, planted=[],
        body="""ALARM MONITORING AGREEMENT

Provider: Alder Creek Security Systems
Subscriber: Cedar Ridge Outfitters LLC

1. TERM AND RENEWAL
This Agreement continues for an initial period of one (1) year and renews
automatically on each anniversary of the date of execution set forth below,
for successive one (1) year periods, unless either party gives written notice
of non-renewal at least thirty (30) days before the applicable anniversary.

2. MONITORING
Provider shall monitor the intrusion detection system continuously and dispatch
local authorities on verified alarm events.

3. FEES
$189 per month, subject to adjustment on each renewal.

IN WITNESS WHEREOF the parties have executed this Agreement this eighteenth day
of September, 2023.
""",
    ),
    dict(
        name="008-saas-subscription-quillstack.txt",
        doc_type="saas_subscription", counterparty="Quillstack Technologies",
        renewal_basis="anniversary_of_execution", renewal_date="2026-11-05",
        notice_days=45, expires=True, pii=False, planted=[],
        body="""PLATFORM SUBSCRIPTION AGREEMENT

Vendor:   Quillstack Technologies
Customer: Cedar Ridge Outfitters LLC

TERM
The subscription term is twelve (12) months and shall renew for successive
twelve (12) month terms on each anniversary of the Effective Date. The
Effective Date is the date of last signature below.

NON-RENEWAL
Either party may prevent renewal by delivering written notice not less than
forty-five (45) days before the anniversary.

FEES
$980 per month for the Standard plan, 25 named users.

Executed by Customer on the fifth day of November, 2024.
Executed by Vendor on the fifth day of November, 2024.
""",
    ),
    dict(
        name="009-maintenance-granite-fleet.txt",
        doc_type="maintenance", counterparty="Granite Fleet Care",
        renewal_basis="anniversary_of_execution", renewal_date="2026-10-02",
        notice_days=60, expires=True, pii=False, planted=[],
        body="""FLEET SERVICING AGREEMENT

Servicer: Granite Fleet Care
Customer: Cedar Ridge Outfitters LLC

TERM
This Agreement takes effect on the execution date recorded below and continues
for one year, renewing thereafter on each successive anniversary of that date
unless terminated on sixty (60) days prior written notice.

SCOPE
Scheduled servicing of six (6) light commercial vehicles at 8,000 mile
intervals, including brake inspection and fluid replacement.

RATE
$310 per vehicle per service interval.

Execution date: October 2, 2022.
""",
    ),
    dict(
        name="010-service-agreement-lantern-hr.txt",
        doc_type="service_agreement", counterparty="Lantern HR Advisory",
        renewal_basis="anniversary_of_execution", renewal_date="2027-03-11",
        notice_days=30, expires=False, pii=False, planted=[],
        body="""HUMAN RESOURCES ADVISORY AGREEMENT

Advisor: Lantern HR Advisory
Client:  Cedar Ridge Outfitters LLC

TERM
One (1) year from execution, renewing automatically on each anniversary of the
execution date unless either party serves thirty (30) days written notice.

SERVICES
Policy handbook maintenance, quarterly compliance review, and on-call advisory
support during business hours.

FEE
$1,450 per month.

Signed this eleventh day of March, 2025.
""",
    ),
    dict(
        name="011-sow-meridian-design.txt",
        doc_type="statement_of_work", counterparty="Meridian Design Studio",
        renewal_basis="anniversary_of_execution", renewal_date="2026-11-20",
        notice_days=30, expires=True, pii=False, planted=[],
        body="""RETAINER STATEMENT OF WORK

Studio: Meridian Design Studio
Client: Cedar Ridge Outfitters LLC

ENGAGEMENT PERIOD
The retainer runs for twelve (12) months from the date this Statement of Work
is countersigned, and continues on each anniversary thereof until either party
elects not to renew on thirty (30) days notice.

SCOPE
Forty (40) design hours per month across packaging, in-store signage, and
seasonal campaign assets. Unused hours do not carry forward.

RETAINER
$6,200 per month.

Countersigned the twentieth day of November, 2024.
""",
    ),

    # -- auto_renew_unless_notice: notice window is the operative fact. ----
    dict(
        name="012-saas-subscription-forgepoint.txt",
        doc_type="saas_subscription", counterparty="Forgepoint Systems",
        renewal_basis="auto_renew_unless_notice", renewal_date="2026-09-30",
        notice_days=60, expires=True, pii=False, planted=[],
        body="""SOFTWARE SUBSCRIPTION TERMS

Supplier: Forgepoint Systems
Customer: Cedar Ridge Outfitters LLC

INITIAL TERM
October 1, 2024 through September 30, 2026.

RENEWAL
Upon expiry of the Initial Term this Agreement shall automatically renew for
successive twelve (12) month terms unless either party provides written notice
of non-renewal not less than sixty (60) days prior to the end of the
then-current term.

Customer acknowledges that failure to serve timely notice results in a binding
further term at the then-current list price.

FEES
$2,340 per month during the Initial Term.
""",
    ),
    dict(
        name="013-service-agreement-blue-heron.txt",
        doc_type="service_agreement", counterparty="Blue Heron Waste Solutions",
        renewal_basis="auto_renew_unless_notice", renewal_date="2026-11-30",
        notice_days=90, expires=True, pii=False, planted=[],
        body="""WASTE COLLECTION SERVICE AGREEMENT

Contractor: Blue Heron Waste Solutions
Customer:   Cedar Ridge Outfitters LLC

TERM
The current term of this Agreement ends November 30, 2026.

EVERGREEN RENEWAL
This Agreement renews for further terms of thirty-six (36) months on the same
terms unless Customer delivers written notice of cancellation by certified mail
no fewer than ninety (90) days before the end of the current term.

Customer is advised that the notice period is a condition precedent to
cancellation and that verbal notice is not effective.

CHARGES
$865 per month for two (2) eight-yard containers, collected twice weekly.
""",
    ),
    dict(
        name="014-maintenance-copperline-it.txt",
        doc_type="maintenance", counterparty="Copperline IT Support",
        renewal_basis="auto_renew_unless_notice", renewal_date="2026-10-15",
        notice_days=30, expires=True, pii=False, planted=[],
        body="""MANAGED IT SUPPORT CONTRACT

Provider: Copperline IT Support
Client:   Cedar Ridge Outfitters LLC

TERM
Current term concludes October 15, 2026, and the contract rolls over for a
further twelve (12) months automatically absent written notice from either
party at least thirty (30) days beforehand.

SERVICE LEVELS
Four (4) hour response for priority incidents, next business day for standard
requests. Monthly patch and backup verification report.

FEE
$3,100 per month covering up to 40 endpoints.
""",
    ),
    dict(
        name="015-lease-ironwood-storage.txt",
        doc_type="lease", counterparty="Ironwood Self Storage",
        renewal_basis="auto_renew_unless_notice", renewal_date="2026-09-01",
        notice_days=15, expires=True, pii=False, planted=[],
        body="""STORAGE UNIT RENTAL AGREEMENT

Operator: Ironwood Self Storage
Occupant: Cedar Ridge Outfitters LLC
Unit:     C-118, approximately 300 square feet

RENTAL PERIOD
Month to month, current period ending September 1, 2026, continuing
automatically month to month thereafter unless Occupant gives fifteen (15)
days written notice to vacate.

RENT
$395 per month, due on the first day of each rental period. Operator may adjust
rent on thirty (30) days notice.
""",
    ),
    dict(
        name="016-saas-subscription-cartograph.txt",
        doc_type="saas_subscription", counterparty="Cartograph Data Co.",
        renewal_basis="auto_renew_unless_notice", renewal_date="2027-04-30",
        notice_days=60, expires=False, pii=False, planted=[],
        body="""DATA SERVICES SUBSCRIPTION

Provider: Cartograph Data Co.
Customer: Cedar Ridge Outfitters LLC

TERM
The then-current term ends April 30, 2027 and renews automatically for
twelve (12) month periods unless cancelled in writing sixty (60) days in
advance of the renewal date.

SUBSCRIPTION
Geospatial demand dataset, quarterly refresh, single-region licence.

FEE
$14,400 annually, invoiced in advance.
""",
    ),

    # -- fiscal_year_end: no date in the operative sentence at all. --------
    dict(
        name="017-service-agreement-westmark.txt",
        doc_type="service_agreement", counterparty="Westmark Audit Group",
        renewal_basis="fiscal_year_end", renewal_date="2026-09-30",
        notice_days=0, expires=True, pii=False, planted=[],
        body="""ENGAGEMENT LETTER

Firm:   Westmark Audit Group
Client: Cedar Ridge Outfitters LLC

TERM
This engagement is coterminous with the Client's fiscal year and concludes on
the final day of that fiscal year. Renewal is by mutual written agreement and
is customarily addressed during the closing meeting.

The Client has advised the Firm that the Client's fiscal year ends on
September 30.

SCOPE
Annual review of financial statements, preparation of the management letter,
and attendance at one board session.

FEE
$27,500 for the engagement.
""",
    ),
    dict(
        name="018-saas-subscription-ledgerline.txt",
        doc_type="saas_subscription", counterparty="Ledgerline Compliance",
        renewal_basis="fiscal_year_end", renewal_date="2026-09-30",
        notice_days=30, expires=True, pii=False, planted=[],
        body="""COMPLIANCE PLATFORM AGREEMENT

Vendor:   Ledgerline Compliance
Customer: Cedar Ridge Outfitters LLC

TERM
The subscription is aligned to the Customer's fiscal year and terminates at
fiscal year end unless renewed. Customer's fiscal calendar closes at the end of
September each year.

Renewal requires an affirmative purchase order; absent one, access is suspended
at fiscal year end and data is retained for ninety (90) days.

NOTICE
Customer shall indicate renewal intent at least thirty (30) days before fiscal
year end.

FEE
$1,875 per month.
""",
    ),
    dict(
        name="019-maintenance-stonebridge.txt",
        doc_type="maintenance", counterparty="Stonebridge Grounds Care",
        renewal_basis="fiscal_year_end", renewal_date="2027-06-30",
        notice_days=0, expires=False, pii=False, planted=[],
        body="""GROUNDS MAINTENANCE SCHEDULE AGREEMENT

Contractor: Stonebridge Grounds Care
Owner:      Cedar Ridge Outfitters LLC (Retail Division)

TERM
Services are contracted on a fiscal year basis and expire at the close of the
Retail Division's fiscal year. The Retail Division operates on a fiscal year
ending June 30, which differs from the parent entity's fiscal calendar.

SCOPE
Seasonal planting, weekly mowing April through October, and snow clearance of
the customer lot and walkways.

FEE
$1,240 per month, flat across the fiscal year.
""",
    ),

    # -- none: perpetual, no renewal concept. ------------------------------
    dict(
        name="020-nda-riverbend.txt",
        doc_type="nda", counterparty="Riverbend Capital Advisors",
        renewal_basis="none", renewal_date="unknown",
        notice_days=0, expires=False, pii=True,
        planted=[
            ("Talia Fenwick", "person_name"),
            ("the Series B raise at a $46 million pre-money valuation", "deal_term"),
        ],
        body="""MUTUAL NON-DISCLOSURE AGREEMENT

Between: Cedar Ridge Outfitters LLC
And:     Riverbend Capital Advisors

1. PURPOSE
The parties wish to exchange confidential information in connection with the
Series B raise at a $46 million pre-money valuation currently under discussion.

2. TERM
The obligations of confidentiality under this Agreement survive indefinitely
and are not subject to renewal or expiration. This Agreement has no fixed term.

3. DEFINITION
Confidential Information includes financial models, customer counts, supplier
terms, and the existence and contents of the discussions themselves.

4. PERMITTED DISCLOSURE
Disclosure is permitted to a party's professional advisors who are bound by
equivalent obligations.

5. NOTICES
Notices to Riverbend Capital Advisors shall be directed to Talia Fenwick,
Managing Director.
""",
    ),

    # -- one contract carrying personal data, to feed the redaction gate ---
    dict(
        name="021-sow-caldwell-consulting.txt",
        doc_type="statement_of_work", counterparty="Caldwell Consulting",
        renewal_basis="fixed_date", renewal_date="2026-10-09",
        notice_days=0, expires=True, pii=True,
        planted=[
            ("Priya Raghunathan", "person_name"),
            ("1147 Selby Court, Apartment 3B", "street_address"),
            ("904-555-0177", "phone"),
            ("p.raghunathan@caldwellconsulting.example", "email"),
            ("intermittent FMLA leave for a cardiac condition", "medical_detail"),
        ],
        body="""STATEMENT OF WORK: INTERIM CONTROLLER

Consultant: Caldwell Consulting
Client:     Cedar Ridge Outfitters LLC

PERIOD
April 10, 2026 through October 9, 2026.

NAMED PERSONNEL
The engagement shall be performed by Priya Raghunathan, who is designated key
personnel and may not be substituted without Client consent.

Contact for scheduling: 904-555-0177, p.raghunathan@caldwellconsulting.example
Remittance address on file: 1147 Selby Court, Apartment 3B

ACCOMMODATION NOTE
Consultant has disclosed that the named personnel is on intermittent FMLA leave
for a cardiac condition and will work a reduced Thursday schedule for the first
sixty (60) days. Client has agreed to this arrangement in writing.

FEE
$185 per hour, not to exceed $96,000 across the period.
""",
    ),
]


def summary():
    """Counts used by the README and the report header."""
    from collections import Counter
    return {
        "total": len(CONTRACTS),
        "by_basis": dict(Counter(c["renewal_basis"] for c in CONTRACTS)),
        "expiring_within_90_days": sum(1 for c in CONTRACTS if c["expires"]),
        "expiring_behind_computed_basis": sum(
            1 for c in CONTRACTS if c["expires"]
            and c["renewal_basis"] in {
                "anniversary_of_execution", "fiscal_year_end"}
        ),
        "with_personal_data": sum(1 for c in CONTRACTS if c["pii"]),
    }
