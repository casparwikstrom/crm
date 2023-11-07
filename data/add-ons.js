const addOns = [
  [
    {
      name: "CRM & Sales Support",
      description: "Description of the CRM & Sales Support option",
      database_name: "crm_sales_support_data"
    },
    {
      name: "HR & Talent",
      description: "Description of the HR & Talent option",
      database_name: "hr_talent_data"
    },
    {
      name: "Business Systems",
      description: "Description of the Business Systems option",
      database_name: "business_systems_data"
    },
    {
      name: "Agreements & E-signing",
      description: "Description of the Agreements & E-signing option",
      database_name: "agreements_e_signing_data"
    },
    {
      name: "Data & Analysis",
      description: "Description of the Data & Analysis option",
      database_name: "data_analysis_data"
    },
    {
      name: "E-commerce",
      description: "Description of the E-commerce option",
      database_name: "e_commerce_data"
    },
    {
      name: "Point of Sale Systems",
      description: "Description of the Point of Sale Systems option",
      database_name: "point_of_sale_systems_data"
    },
    {
      name: "Live Chat & Chatbot",
      description: "Description of the Live Chat & Chatbot option",
      database_name: "live_chat_chatbot_data"
    },
    {
      name: "Payroll & Accounting",
      description: "Description of the Payroll & Accounting option",
      database_name: "payroll_accounting_data"
    },
    {
      name: "Recruitment & ATS",
      description: "Description of the Recruitment & ATS option",
      database_name: "recruitment_ats_data"
    },
    {
      name: "Phone Systems & Business Telephony",
      description: "Description of the Phone Systems & Business Telephony option",
      database_name: "phone_systems_business_telephony_data"
    },
    {
      name: "Time & Project Management",
      description: "Description of the Time & Project Management option",
      database_name: "time_project_management_data"
    },
    {
      name: "Operations & Management Systems",
      description: "Description of the Operations & Management Systems option",
      database_name: "operations_management_systems_data"
    },
    {
      name: "Ticketing & Helpdesk",
      description: "Description of the Ticketing & Helpdesk option",
      database_name: "ticketing_helpdesk_data"
    }
  ],
  [
    {
      name: "Sales",
      description: "Description of the Sales option",
      database_name: "sales_data"
    },
    {
      name: "Operations",
      description: "Description of the Operations option",
      database_name: "operations_data"
    },
    {
      name: "Marketing",
      description: "Description of the Marketing option",
      database_name: "marketing_data"
    },
    {
      name: "Customer Service",
      description: "Description of the Customer Service option",
      database_name: "customer_service_data"
    },
    {
      name: "After Sales",
      description: "Description of the After Sales option",
      database_name: "after_sales_data"
    },
    {
      name: "Information Technology",
      description: "Description of the Information Technology option",
      database_name: "it_data"
    },
    {
      name: "Finance",
      description: "Description of the Finance option",
      database_name: "finance_data"
    },
    {
      name: "Dont Know",
      description: "Description of the Dont Know option",
      database_name: "unknown_data"
    }
  ],[
    {
      name: "Få bättre tillgång till sälj- och prognosdata",
      description: "Beskrivning av alternativet Få bättre tillgång till sälj- och prognosdata",
      database_name: "db_sales_forecast_data"
    },
    {
      name: "Centralisera kunddatan och använda automatiska funktioner för att förenkla arbetet för säljstyrkan",
      description: "Beskrivning av alternativet Centralisera kunddatan och använda automatiska funktioner för att förenkla arbetet för säljstyrkan",
      database_name: "db_centralize_customer_data"
    },
    {
      name: "Ta bort admin och manuella processer",
      description: "Beskrivning av alternativet Ta bort admin och manuella processer",
      database_name: "db_remove_admin_tasks"
    },
    {
      name: "Kombinera och förbättra samarbetet mellan sälj och marknadsföring",
      description: "Beskrivning av alternativet Kombinera och förbättra samarbetet mellan sälj och marknadsföring",
      database_name: "db_improve_sales_marketing_collab"
    },
    {
      name: "För bättre kundservice",
      description: "Beskrivning av alternativet För bättre kundservice",
      database_name: "db_improve_customer_service"
    },
    {
      name: "För att kunna spåra våra interaktioner med kunderna",
      description: "Beskrivning av alternativet För att kunna spåra våra interaktioner med kunderna",
      database_name: "db_track_customer_interactions"
    },
    {
      name: "Vill ha bättre struktur och processer för att stärka våra kundrelationer",
      description: "Beskrivning av alternativet Vill ha bättre struktur och processer för att stärka våra kundrelationer",
      database_name: "db_strengthen_customer_relations"
    },
    {
      name: "Bättre leadgeneration",
      description: "Beskrivning av alternativet Bättre leadgeneration",
      database_name: "db_improve_lead_generation"
    }
  ], [
    {
      name: "Inverkan på pris",
      description: "Beskrivning av alternativet 'Inverkan på pris'",
      database_name: "db_price_impact"
    },
    {
      name: "Andra företag har valt",
      description: "Beskrivning av alternativet 'Andra företag har valt'",
      database_name: "db_other_companies_choice"
    },
    {
      name: "Pipe Management",
      description: "Beskrivning av alternativet 'Pipe Management'",
      database_name: "db_pipe_management"
    },
    {
      name: "Ärendehantering",
      description: "Beskrivning av alternativet 'Ärendehantering'",
      database_name: "db_case_management"
    },
    {
      name: "E-post kampanjer",
      description: "Beskrivning av alternativet 'E-post kampanjer'",
      database_name: "db_email_campaigns"
    },
    {
      name: "Dashboard - Säljöversikt",
      description: "Beskrivning av alternativet 'Dashboard - Säljöversikt'",
      database_name: "db_sales_dashboard"
    },
    {
      name: "Områdeshantering",
      description: "Beskrivning av alternativet 'Områdeshantering'",
      database_name: "db_area_management"
    },
    {
      name: "Leadgeneration via webben",
      description: "Beskrivning av alternativet 'Leadgeneration via webben'",
      database_name: "db_web_lead_generation"
    },
    {
      name: "Kalenderintegration & påminnelse",
      description: "Beskrivning av alternativet 'Kalenderintegration & påminnelse'",
      database_name: "db_calendar_integration"
    },
    {
      name: "Säljprognoser & data",
      description: "Beskrivning av alternativet 'Säljprognoser & data'",
      database_name: "db_sales_forecasts"
    },
    {
      name: "Marketing automation",
      description: "Beskrivning av alternativet 'Marketing automation'",
      database_name: "db_marketing_automation"
    },
    {
      name: "Säljgamification",
      description: "Beskrivning av alternativet 'Säljgamification'",
      database_name: "db_sales_gamification"
    },
    {
      name: "Sociala Media integration",
      description: "Beskrivning av alternativet 'Sociala Media integration'",
      database_name: "db_social_media_integration"
    }
  ]
];

export default addOns;
