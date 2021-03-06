import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {
  @Input() channel;
  messageText: String;
  user: String;
  group: String;
  messageArray:Array<{user: String, message: String}> = [];

  constructor(private route: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService,
    private groupService: GroupService) {
    this.chatService.newUserJoined()
      .subscribe(data=>this.messageArray.push(data));

    this.chatService.newMessageReceived()
      .subscribe(data=>this.messageArray.push(data));
   }

  ngOnInit() {
    this.getUser();
    this.getGroup();
    this.chatService.joinGroup({user: this.user, group: this.group})
  }

  //retrieves current user
  getUser(){
    this.user = this.userService.getCurrentUser();
  }

  //function to leave channel
  leave(){
    this.chatService.leaveGroup({user: this.user, group: this.group});
    history.back();
  }

  //retrieves current selected group
  getGroup(){
    this.group = this.groupService.getCurrentGroup();
  }

  //send message function
  sendMessage(){
    this.getUser();
    this.getGroup();
    this.chatService.sendMessage({user: this.user, group: this.group, message:this.messageText})
    this.getMessages();
  }

  //get messages function
  getMessages(){
    console.log(this.messageArray);
    return this.messageArray;
  }

}
