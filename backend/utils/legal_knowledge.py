"""
Pakistani Legal Knowledge Base
Contains information about Pakistan's laws, constitution, and legal categories
"""

PAKISTAN_CONSTITUTION_SUMMARY = """
CONSTITUTION OF PAKISTAN (1973)
The Constitution of Pakistan is the supreme law of Pakistan. Key aspects:

Part I - Federal Structure:
- Supremacy of Constitution (Article 1)
- Islamic values in legislation (Article 2A)
- Sovereignty of Parliament (Article 89)

Part II - Fundamental Rights:
- Right to life and liberty (Article 9)
- Freedom of movement (Article 15)
- Freedom of association (Article 17)
- Freedom of thought, conscience and religion (Article 20)
- Right to education (Article 37-A)
- Right to fair trial (Articles 24-25)
- Right to information (Article 19-A)

Part IV - Islamic Provisions:
- Promotion of Islamic values
- Organization of Islamic instruction
- Islamic way of life

Division of Powers:
- Federal Legislative List (Fourth Schedule)
- Concurrent Legislative List (Fourth Schedule)
- Provincial Autonomy
"""

LEGAL_CATEGORIES = {
    "criminal_law": {
        "name": "Criminal Law",
        "description": "Includes crimes and punishments",
        "main_law": "Pakistan Penal Code (PPC) 1860",
        "key_sections": [
            "Section 302-304: Punishment for culpable homicide",
            "Section 379-382: Theft",
            "Section 406-409: Criminal breach of trust",
            "Section 420: Cheating",
            "Section 493-498: Bigamy and related offences"
        ]
    },
    "family_law": {
        "name": "Family Law",
        "description": "Marriage, divorce, guardianship, inheritance",
        "main_law": "Family Law Ordinance 1961, Islamic provisions",
        "key_sections": [
            "Islamic Marriage",
            "Dower (Mahr)",
            "Divorce (Talaq, Judicial Divorce)",
            "Guardianship",
            "Inheritance according to Islamic Sharia"
        ]
    },
    "labor_law": {
        "name": "Labor & Employment Law",
        "description": "Workers' rights, employment contracts, conditions",
        "main_law": "Industrial Relations Ordinance 2002, Employment Laws",
        "key_sections": [
            "Right to minimum wage",
            "Workplace safety",
            "Working hours and overtime",
            "Leave and holidays",
            "Dispute resolution",
            "Trade union rights"
        ]
    },
    "civil_law": {
        "name": "Civil Law",
        "description": "Property, contracts, disputes between citizens",
        "main_law": "Civil Procedure Code 1908, Contract Act 1872",
        "key_sections": [
            "Contract formation and enforcement",
            "Property rights and disputes",
            "Succession and inheritance",
            "Civil remedies",
            "Tort law"
        ]
    },
    "corporate_law": {
        "name": "Corporate & Business Law",
        "description": "Companies, business registration, contracts",
        "main_law": "Companies Act 2017, Sales Tax Act, Income Tax Ordinance",
        "key_sections": [
            "Company formation and registration",
            "Directors' duties",
            "Shareholder rights",
            "Corporate governance",
            "Taxation"
        ]
    },
    "property_law": {
        "name": "Property Law",
        "description": "Real and moveable property rights, succession",
        "main_law": "Transfer of Property Act 1882, Succession Act",
        "key_sections": [
            "Ownership and possession",
            "Sale and transfer of property",
            "Lease and tenancy",
            "Mortgages and charges",
            "Inheritance and succession"
        ]
    }
}

QUICK_CONTACTS = {
    "legal_aid": {
        "name": "Pakistan Legal Aid Organization",
        "services": "Free legal aid for poor and needy",
        "contact": "Information available at bar councils"
    },
    "bar_council": {
        "name": "Supreme Court Bar Association",
        "services": "Lawyer referral and bar discipline",
        "website": "www.scba.org.pk"
    },
    "emergency": {
        "name": "Emergency Services",
        "police": "15",
        "complaint_center": "Contact nearest police station or FIA"
    }
}

def get_legal_category_info(category: str) -> dict:
    """Get information about a specific legal category"""
    return LEGAL_CATEGORIES.get(category, {})

def get_all_categories() -> dict:
    """Get all legal categories"""
    return LEGAL_CATEGORIES

def get_quick_reference(topic: str) -> str:
    """Get quick reference information"""
    if topic.lower() == "constitution":
        return PAKISTAN_CONSTITUTION_SUMMARY
    elif topic.lower() == "categories":
        return str(list(LEGAL_CATEGORIES.keys()))
    return "Topic not found"
