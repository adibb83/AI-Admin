import { Component, OnInit } from "@angular/core";

@Component({
    moduleId: module.id,
    styleUrls: ['./faqs.component.css'],
    templateUrl: './faqs.component.html',
})

export class FaqsComponent {
   questions=[
       {question:"How much does this cost? How is a user considered a monthly active user?",answer:"$5 per active user. We only charge for team members that actually use OAi. An active user is anyone that has viewed, commented, liked, or written a post in a given month. At the end of the month, no matter how many employees you have, you will only be billed for your active users."},
       {question:"How does the money back guarantee work?",answer:"If you′re not satisfied, we′re not satisfied. If you find that Bold doesn′t work for you for whatever reason, just contact us at hello@oai.com within the first 30 days and we′ll gladly refund your money."},
       {question:"Why did you create OAi?",answer:"We are firm believers of open communication and transparency at companies. We believe having a space to debate issues, document knowledge, and share ideas is key to fostering a healthy and successful company. That′s why we built OAi."},
       {question:"What makes OAi different from other products?",answer:"While other products are focused on real-time collaboration, documentation and spreadsheets—our focus is on building tools and assistants that make it easier to write and publish your ideas to your team.Posts are published to your team page where they′ll be discoverable by everyone on your team. No need to share links and edit permissions."},
       {question:"What are 'Assistants'?",answer:"Assistants are bots that live in our editor. They exist to make writing easier. You can call on them to set the mood, create outlines, and even analyze and suggest ways to improve your writing."},
       {question:"Can I create my own Assistant?", answer:"Currently, assistants are only available from the team here at Bold. Eventually, our plan is to work with other developers to create and bring a wider range of assistants to the Bold editor."},
       {question:"Who′s building OAi?",answer:"Oai is built by Sensiya."},
       {question:"Is there a Mac, iOS or Android app?",answer:"At present, we are 100% focused on bringing the best possible experience to the web. However, we plan to follow up with great Mac, iOS, and Android apps in the future."},
       {question:"Lots of startups shut down or get acquired, how will I be protected?",answer:"We′ll work with you to ensure that everything you create will be easily retrievable in the event that services are ceased."}
   ]
}
