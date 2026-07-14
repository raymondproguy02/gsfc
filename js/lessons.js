// LESSONS DATA

export const LESSONS = [
    // WELCOME (id: 0)
    {
        id: 0,
        title: "Welcome",
        isWelcome: true,
        content: `
            <div style="text-align:center; margin-bottom:16px;">
                <i class="fas fa-dove" style="font-size:64px; color:var(--accent-gold);"></i>
            </div>
            <p style="font-size:18px; font-weight:500; text-align:center; color:var(--text-primary);">
                Welcome to <strong>The Consciousness of the Son</strong>
            </p>
            <p>
                This is a journey into the depths of what Christ has already accomplished
                on your behalf. Over the coming lessons, we will explore what it truly
                means to live from the finished work of the Cross — not striving to earn
                what has already been freely given, but growing into the reality of our
                inheritance in Christ.
            </p>
            <p>
                My prayer is that as you walk through these pages, the eyes of your
                understanding will be opened, your heart will be settled in God's love,
                and you will discover the freedom that comes from knowing — truly knowing —
                that He has already blessed us with every spiritual blessing in Christ.
            </p>
            <div class="welcome-scripture">
                <i class="fas fa-quote-left" style="color:var(--accent-gold); margin-right:8px;"></i>
                <strong>"He that spared not his own Son, but delivered him up for us all,
                how shall he not with him also freely give us all things?"</strong>
                <br />— Romans 8:32
            </div>
            <p style="margin-top:16px; font-weight:500; text-align:center;">
                <i class="fas fa-heart" style="color:var(--accent-gold);"></i>
                With love and reflection,
                <br /><em>Grace Spring Family Church</em>
            </p>
        `
    },
    
    // LESSON 1
    {
        id: 1,
        title: "The Foundation: God Is Not Withholding",
        subtitle: "Learning to trust what He has already revealed",
        image: {
            src: "images/lessons/lesson1.jpg",
            alt: "The Cross at Calvary",
            caption: "The Cross settled that question forever"
        },
        content: `
            <p>The beginning of spiritual maturity is not learning how to persuade God.</p>
            <p>It is learning how to trust what He has already revealed.</p>
            <p>Many believers live as though Heaven is still making up its mind — whether to answer, whether to bless, whether to show mercy.</p>
            <p>Yet the New Covenant begins with a different announcement. <strong>God has already spoken.</strong> He has already revealed His heart.</p>
            <div class="scripture-block">
                <i class="fas fa-quote-left" style="color:var(--accent-gold); margin-right:8px;"></i>
                <strong>"He that spared not his own Son, but delivered him up for us all, how shall he not with him also freely give us all things?"</strong>
                <br />— Romans 8:32
            </div>
            <p>The Cross is not evidence that God <em>might</em> be generous. The Cross is evidence that He <strong>already is</strong>.</p>
            <div class="highlight-box">
                <i class="fas fa-check-circle"></i>
                <strong>"It is finished."</strong> — John 19:30
                <br />
                <span style="font-size:14px; color:var(--text-light);">The work of reconciliation was completed. The debt of sin was paid.</span>
            </div>
            <p>Scripture declares: <em>"Blessed be the God and Father of our Lord Jesus Christ, who hath blessed us with all spiritual blessings in heavenly places in Christ."</em> (Ephesians 1:3)</p>
            <p>The Christian life does not begin from scarcity. It begins from inheritance.</p>
        `,
        meditation: {
            text: `"If God did not withhold His Son from me, what does that reveal about His heart toward me?"`,
            instruction: `Sit quietly before the Lord. Do not rush to answer. Allow the Holy Spirit to move this truth from your mind into your heart. Let the Cross speak.`
        },
        exercise: {
            text: `Read Romans 8 slowly and prayerfully. Each time you encounter a statement revealing God's generosity, pause and thank Him aloud.`,
            declaration: `"I do not approach God as one trying to earn His favour. I approach Him as one who has already been welcomed through Christ."`
        },
        prayer: `Pray in the Spirit.`
    },
    // 📝 ADD YOUR LESSONS BELOW (copy the template above)
    
];

export default LESSONS;