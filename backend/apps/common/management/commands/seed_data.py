from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from services.models import Service, ServiceFeature
from projects.models import Project
from pricing.models import PricingTier
from website.models import Setting

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds initial realistic enterprise data for Yukti Technologies website.'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database with premium enterprise data...')

        # 1. Create Users
        admin_user, created = User.objects.get_or_create(
            username='admin',
            email='admin@yuktitechnologies.com',
            defaults={
                'first_name': 'Yukti',
                'last_name': 'Admin',
                'role': User.ADMIN,
                'is_staff': True,
                'is_superuser': True
            }
        )
        if created:
            admin_user.set_password('AdminPassword123')
            admin_user.save()
            self.stdout.write(self.style.SUCCESS('Admin user created successfully (username: admin, password: AdminPassword123)'))
        else:
            self.stdout.write('Admin user already exists.')

        # 2. Create Services
        services_data = [
            {
                'title': 'Artificial Intelligence',
                'slug': 'artificial-intelligence',
                'icon_identifier': 'BrainCircuit',
                'short_description': 'Incorporate custom large language models, RAG pipelines, and predictive analytics into your corporate architecture.',
                'full_content': 'We build custom deep learning models, deploy scalable LLM agents, design semantic retrieval-augmented generation systems, and build automated intelligence into existing products. We help enterprise clients transition from simple software to agentic intelligence.',
                'order': 1,
                'features': [
                    {'title': 'RAG & Semantic Search', 'description': 'Vector database indexing (Pinecone/Milvus) for highly context-aware enterprise search.'},
                    {'title': 'Custom Model Fine-tuning', 'description': 'Refining open-source foundation models on proprietary corporate data for domain-specific compliance.'},
                    {'title': 'AI Agent Workflows', 'description': 'Self-correcting, multi-agent frameworks capable of executing complex business automation steps.'}
                ]
            },
            {
                'title': 'Cloud Engineering',
                'slug': 'cloud-engineering',
                'icon_identifier': 'Cloud',
                'short_description': 'Zero-downtime migrations, secure multi-tenant Kubernetes platforms, and serverless scalability.',
                'full_content': 'Our cloud engineers design robust, cloud-native environments built on AWS, Google Cloud, and Azure. We specialize in high-availability Kubernetes setups, automated horizontal scaling, and secure IAM policies following strict compliance frameworks.',
                'order': 2,
                'features': [
                    {'title': 'Kubernetes Orchestration', 'description': 'Enterprise-grade EKS/GKE cluster configurations with automated service meshes.'},
                    {'title': 'Infrastructure as Code', 'description': 'Declarative provisioning utilizing modular, version-controlled Terraform architectures.'},
                    {'title': 'Cloud Cost Optimization', 'description': 'Deep auditing and cluster right-sizing yielding an average of 35% reduction in cloud spend.'}
                ]
            },
            {
                'title': 'Data Engineering',
                'slug': 'data-engineering',
                'icon_identifier': 'Database',
                'short_description': 'Real-time event streaming, modern lakehouse architectures, and structured high-throughput pipelines.',
                'full_content': 'We enable data-driven decision making by constructing highly scalable pipelines. From real-time event ingestion with Apache Kafka to historical analytical modeling in Delta Lake and Snowflake, we format and secure your data.',
                'order': 3,
                'features': [
                    {'title': 'Real-time Streaming', 'description': 'Event-driven message routing via Apache Kafka and Apache Flink for real-time analytics.'},
                    {'title': 'Modern Data Lakehouse', 'description': 'Consolidating structured and unstructured logs into query-optimized Delta Lake storage.'},
                    {'title': 'Advanced ETL/ELT Pipelines', 'description': 'Secure data extraction using dbt (data build tool) and Apache Airflow orchestrations.'}
                ]
            },
            {
                'title': 'Automation & DevOps',
                'slug': 'automation-devops',
                'icon_identifier': 'Cpu',
                'short_description': 'Accelerate development cycles with advanced CI/CD pipelines, automated testing, and secure delivery.',
                'full_content': 'We eliminate manual human friction in deployment cycles by architecting automated developer platforms. Our pipelines automate build, lint, code validation, vulnerability scanning, and Canary deployments.',
                'order': 4,
                'features': [
                    {'title': 'Continuous Delivery', 'description': 'Automated git-ops delivery pipelines using ArgoCD and GitHub Actions.'},
                    {'title': 'Security (DevSecOps)', 'description': 'Automated SAST, DAST, and container dependency security scans run on every pull request.'},
                    {'title': 'RPA & Workflow Automation', 'description': 'Custom bots automating legacy back-office software screens without API access.'}
                ]
            }
        ]

        services_instances = {}
        for s_data in services_data:
            features = s_data.pop('features')
            service, s_created = Service.objects.get_or_create(
                slug=s_data['slug'],
                defaults=s_data
            )
            services_instances[service.slug] = service
            if s_created:
                for feat in features:
                    ServiceFeature.objects.create(service=service, **feat)
                self.stdout.write(f"Created service: {service.title}")

        # 3. Create Projects
        projects_data = [
            {
                'title': 'MedLife AI Diagnosis Core',
                'slug': 'medlife-ai-diagnosis-core',
                'description': 'Building a context-aware clinical semantic search and patient triaging pipeline for a network of 40 hospitals.',
                'long_description': 'Yukti Technologies engineered a HIPAA-compliant medical database search core using Llama-3-70B fine-tuned models. The platform leverages high-dimensional vector representations of doctor notes to match similar historical cases instantly, dropping critical diagnosis lookup times by 82%. We implemented strict encryption standards, role-based access, and detailed logs auditing all clinical views.',
                'client': 'MedLife Solutions',
                'industry': 'Healthcare',
                'live_url': 'https://medlife-solutions.com',
                'status': Project.PUBLISHED,
                'services': ['artificial-intelligence', 'cloud-engineering']
            },
            {
                'title': 'Apex Financial High-Speed Data Hub',
                'slug': 'apex-financial-high-speed-data-hub',
                'description': 'Real-time transaction anomaly scanner capable of processing 12,000 credit card entries per second.',
                'long_description': 'For Apex Financial, we designed a high-throughput, event-driven analytics backend using Apache Kafka and Apache Flink. The platform extracts, runs feature engineering, and forwards transactions to an online ML model for fraud detection within a 12ms SLA window. Combined with custom visualization graphs, their security operations team can block compromised payments in near real-time.',
                'client': 'Apex Financial Group',
                'industry': 'FinTech',
                'status': Project.PUBLISHED,
                'services': ['data-engineering', 'automation-devops']
            },
            {
                'title': 'Logistics Flow Optimization Portal',
                'slug': 'logistics-flow-optimization-portal',
                'description': 'Migrating a global shipping coordinator from on-prem legacy databases to auto-scaling Google Cloud Kubernetes.',
                'long_description': 'We migrated TransRoute Logistics from their aging on-prem hypervisors to an advanced Google Cloud environment. Using Terraform, we structured a multi-regional GKE platform hosting over 120 decoupled microservices. We implemented zero-downtime database replication, custom routing proxies, and autoscaling rules that adjust cluster resources dynamically during global high-volume holiday periods.',
                'client': 'TransRoute Global Logistics',
                'industry': 'Logistics & Supply Chain',
                'status': Project.PUBLISHED,
                'services': ['cloud-engineering', 'automation-devops']
            }
        ]

        for p_data in projects_data:
            services_slugs = p_data.pop('services', [])
            project, p_created = Project.objects.get_or_create(
                slug=p_data['slug'],
                defaults=p_data
            )
            if p_created:
                for slug in services_slugs:
                    if slug in services_instances:
                        project.services_rendered.add(services_instances[slug])
                self.stdout.write(f"Created project: {project.title}")

        # 4. Create Pricing Tiers
        pricing_data = [
            {
                'name': 'Startup Acceleration',
                'slug': 'startup-acceleration',
                'cost': '$1,999',
                'billing_cycle': 'month',
                'short_description': 'Ideal for early-stage companies needing high-end software architecture consulting and prototype building.',
                'features': [
                    'Dedicated Technical Architect (5 hrs/week)',
                    'Cloud Infrastructure Review & Security Audits',
                    'CI/CD Pipeline Setup & Best Practices',
                    '24/7 Server Health Monitoring alerts',
                    'Slack & Email Developer Support (24h response)'
                ],
                'is_featured': False,
                'order': 1
            },
            {
                'name': 'Enterprise Transformation',
                'slug': 'enterprise-transformation',
                'cost': '$4,999',
                'billing_cycle': 'month',
                'short_description': 'Full-scale design, engineering, and maintenance for mid-market and enterprise platforms.',
                'features': [
                    'Dedicated Engineering Team (20 hrs/week)',
                    'Custom AI Integration & Model Fine-Tuning',
                    'Kubernetes Clustering & Multi-Cloud Setup',
                    'SOC 2 Compliance Readiness Checks',
                    'Dedicated Account Manager & 4-Hour Support SLA',
                    'Weekly Standups & Milestone Reviews'
                ],
                'is_featured': True,
                'order': 2
            },
            {
                'name': 'Custom Strategy',
                'slug': 'custom-strategy',
                'cost': 'Custom',
                'billing_cycle': 'project',
                'short_description': 'Bespoke software development, dedicated full-time engineering pods, and custom SLA agreements.',
                'features': [
                    'Dedicated Full-Time Developers & Tech Lead',
                    'On-Premise or Private Cloud Deployment',
                    '24/7/365 Dedicated SRE On-Call Team',
                    'Full Intellectual Property Rights Transfer',
                    'HIPAA / GDPR / SOC 2 Audits & Compliance Integration'
                ],
                'is_featured': False,
                'order': 3
            }
        ]

        for pt_data in pricing_data:
            tier, pt_created = PricingTier.objects.get_or_create(
                slug=pt_data['slug'],
                defaults=pt_data
            )
            if pt_created:
                self.stdout.write(f"Created pricing tier: {tier.name}")

        # 5. Create Settings
        settings_data = [
            {'key': 'site_name', 'value': 'Yukti Technologies', 'group': Setting.GENERAL, 'description': 'The company brand name.'},
            {'key': 'site_title', 'value': 'Yukti Technologies | Enterprise AI, Cloud & Data Engineering', 'group': Setting.SEO, 'description': 'Default browser tab title.'},
            {'key': 'meta_description', 'value': 'Yukti Technologies designs high-performance enterprise applications, custom AI pipelines, and cloud systems for market leaders.', 'group': Setting.SEO, 'description': 'SEO snippet meta description.'},
            {'key': 'contact_email', 'value': 'solutions@yuktitechnologies.com', 'group': Setting.CONTACT, 'description': 'Main contact inquiries email.'},
            {'key': 'contact_phone', 'value': '+1 (800) 555-0190', 'group': Setting.CONTACT, 'description': 'Corporate telephone line.'},
            {'key': 'office_address', 'value': 'Infinity Tower A, Suite 900, Silicon Oasis, Bangalore, KA, India', 'group': Setting.CONTACT, 'description': 'Physical headquarters location.'},
            {'key': 'linkedin_url', 'value': 'https://linkedin.com/company/yukti-technologies', 'group': Setting.SOCIAL, 'description': 'LinkedIn profile link.'},
            {'key': 'github_url', 'value': 'https://github.com/yukti-technologies', 'group': Setting.SOCIAL, 'description': 'Corporate github page.'},
        ]

        for s_item in settings_data:
            setting, s_created = Setting.objects.get_or_create(
                key=s_item['key'],
                defaults=s_item
            )
            if s_created:
                self.stdout.write(f"Created setting: {setting.key}")

        self.stdout.write(self.style.SUCCESS('Successfully seeded database!'))
