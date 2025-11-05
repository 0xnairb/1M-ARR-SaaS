# FlowReconcile Landing Page

Validation landing page for FlowReconcile - E-commerce Financial Reconciliation Automation.

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
# PostHog Analytics (get from https://posthog.com)
NEXT_PUBLIC_POSTHOG_KEY=your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# ConvertKit for email capture (get from https://convertkit.com)
CONVERTKIT_API_KEY=your_api_key
CONVERTKIT_FORM_ID=your_form_id

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/flowreconcile-landing)

### Manual Deploy

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repo
5. Add environment variables
6. Deploy

### Custom Domain

1. Go to Project Settings > Domains
2. Add your domain (e.g., flowreconcile.com)
3. Configure DNS:
   - Type: A
   - Name: @
   - Value: 76.76.21.21
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com

## Analytics Setup

### PostHog (Recommended)

1. Sign up at [posthog.com](https://posthog.com)
2. Create new project
3. Copy Project API Key
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxx
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```

**Events Tracked**:
- Page views
- CTA button clicks
- Form submissions
- Scroll depth
- Time on page

### Google Analytics (Optional)

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

## Email Capture Setup

### ConvertKit (Recommended)

1. Sign up at [convertkit.com](https://convertkit.com) (free up to 1,000 subscribers)
2. Create a form
3. Get API Key (Settings > API Keys)
4. Get Form ID (from form URL)
5. Add to `.env.local`

**Email Sequence** (set up in ConvertKit):
- Email 1 (immediate): Welcome + download guide
- Email 2 (day 3): Education about reconciliation
- Email 3 (day 7): Update + discount code

### Alternative Options

**Mailchimp**:
- Free up to 500 subscribers
- API docs: https://mailchimp.com/developer/

**Loops**:
- Modern, built for SaaS
- Good for transactional emails
- Site: https://loops.so

## Success Metrics

### Target Goals

- **Traffic**: 500 visitors
- **Conversion**: 10% (50 signups)
- **Qualified Leads**: 10+ willing to pre-pay

### Track in PostHog

**Key Metrics**:
1. Unique visitors
2. Email signup conversion rate
3. Button click rates
4. Scroll depth (% reaching pricing)
5. Revenue segment breakdown
6. Pain point distribution

**Dashboard**:
- Create dashboard in PostHog
- Add funnels: Visitor → CTA Click → Form Submit
- Set up alerts for 50+ signups

## A/B Testing

### Headline Variations (test with PostHog)

**Version A** (current):
> "Stop Wasting 25 Hours a Week on E-commerce Reconciliation"

**Version B**:
> "Automate Your E-commerce Accounting in 5 Minutes"

**Version C**:
> "Save $65,000/Year on Financial Reconciliation"

### How to Test

1. In PostHog, go to Experiments
2. Create new experiment
3. Split traffic 33/33/33
4. Run for 500 visitors
5. Pick winner based on signup conversion

## Traffic Generation

### Week 1: Organic (200 visitors)

**Reddit** (post in):
- r/shopify (1M members)
- r/ecommerce (500K members)
- r/smallbusiness

**Template**:
```
Title: How do you handle Shopify to QuickBooks reconciliation?

Body: Hey everyone! I run a $2M D2C brand and spend 15+ hours/month
matching Shopify sales to Stripe deposits and entering everything into
QuickBooks. It's mind-numbing.

How do you all handle this? Any tools or processes that work well?

[Participate genuinely in discussion, mention you're building solution
only if asked]
```

**LinkedIn** (personal post):
```
I just realized we're spending $1,500/month (in time) on something that
should be automated.

Financial reconciliation for e-commerce is painful:
- Shopify sales
- Stripe deposits
- QuickBooks entries
- Fees, refunds, multi-currency

How are other e-commerce operators handling this?

[Link to landing page in comments]
```

### Week 2: Communities (200 visitors)

**Facebook Groups**:
- Shopify Entrepreneurs
- E-commerce Marketing & Growth
- D2C Brands

**Indie Hackers**:
- Post in "Show IH" when launching

**Shopify Community**:
- Answer questions about accounting
- Provide value first
- Mention solution naturally

### Week 3: Paid Test (100 visitors, $200 budget)

**Google Ads**:
- Keywords: "shopify accounting", "shopify quickbooks sync"
- Budget: $5-10/day
- Target: <$2 per click

**Facebook/Instagram Ads**:
- Audience: E-commerce business owners
- Budget: $5-10/day
- Retarget website visitors

## Conversion Optimization

### If Conversion < 5%

**Test**:
1. Shorter form (just email)
2. Different headline (test A/B/C)
3. Add demo video
4. Social proof (even if "500+ on waitlist")

### If Conversion 5-10%

**Optimize**:
1. Keep messaging
2. Add exit-intent popup
3. Add live chat (Intercom or Crisp)
4. Email follow-up sequence

### If Conversion >10%

**Scale**:
1. Increase ad spend
2. Expand to more communities
3. Start customer interviews
4. Begin MVP development

## Next Steps After Landing Page

### When you hit 50 signups:

1. **Email Everyone**:
   - Thank them for signing up
   - Share timeline (MVP in 8-10 weeks)
   - Ask for 15-min interview

2. **Conduct Interviews**:
   - Use scripts from FLOWRECONCILE_INTERVIEWS.md
   - Target: 20 problem interviews
   - Validate pain severity

3. **Make GO/NO-GO Decision**:
   - 70%+ say it's a major problem? → GO
   - 30%+ willing to pre-pay? → GO
   - <50% interest? → Iterate or pivot

4. **Start MVP Development**:
   - Begin Week 5 of roadmap
   - 12-week build timeline
   - Keep validation list engaged with updates

## Maintenance

### Weekly Tasks
- Monitor signups in ConvertKit
- Check analytics in PostHog
- Respond to emails/questions
- Share progress on social

### Monthly Tasks
- Review conversion rates
- Analyze traffic sources
- Optimize based on data
- Update messaging if needed

## Support

Questions? Email: hello@flowreconcile.com

## License

MIT
