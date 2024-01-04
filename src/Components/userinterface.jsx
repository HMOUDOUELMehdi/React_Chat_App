import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import $ from 'jquery';

class Home extends React.Component {
  componentDidMount(){
  $('#action_menu_btn').click(function(){
    $('.action_menu').toggle();
  });
  }
 
  render() {
   
    return (
     
        <div className="maincontainer">
         
         
          <div class="container-fluid h-50">
            <div class="row justify-content-center h-100">
              <div class="col-md-4 col-xl-3 chat"><div class="card mb-sm-3 mb-md-0 contacts_card">
                <div class="card-header">
                  <div class="input-group">
                    <input type="text" placeholder="Search..." name="" class="form-control search" />
                    <div class="input-group-prepend">
                      <span class="input-group-text search_btn"><i class="fas fa-search"></i></span>
                    </div>
                  </div>
                </div>
                <div class="card-body contacts_body">
                  <ul class="contacts">
                  <li class="active">
                    <div class="d-flex bd-highlight">
                      <div class="img_cont">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="rounded-circle user_img" />
                        <span class="online_icon"></span>
                      </div>
                      <div class="user_info">
                        <span>jassa</span>
                        <p>Kalid is online</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="d-flex bd-highlight">
                      <div class="img_cont">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="rounded-circle user_img" />
                        <span class="online_icon offline"></span>
                      </div>
                      <div class="user_info">
                        <span>jassa</span>
                        <p>Taherah left 7 mins ago</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="d-flex bd-highlight">
                      <div class="img_cont">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="rounded-circle user_img" />
                        <span class="online_icon"></span>
                      </div>
                      <div class="user_info">
                        <span>jassa Mann</span>
                        <p>Sami is online</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="d-flex bd-highlight">
                      <div class="img_cont">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="rounded-circle user_img" />
                        <span class="online_icon offline"></span>
                      </div>
                      <div class="user_info">
                        <span>jassa Mann</span>
                        <p>Nargis left 30 mins ago</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="d-flex bd-highlight">
                      <div class="img_cont">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="rounded-circle user_img" />
                        <span class="online_icon offline"></span>
                      </div>
                      <div class="user_info">
                        <span>jassa Mann</span>
                        <p>Rashid left 50 mins ago</p>
                      </div>
                    </div>
                  </li>
                </ul>
                </div>
                <div class="card-footer"></div>
              </div></div>
              <div class="col-md-8 col-xl-6 chat">
                <div class="card">
                  <div class="card-header msg_head">
                    <div class="d-flex bd-highlight">
                      <div class="img_cont">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="rounded-circle user_img" />
                        <span class="online_icon"></span>
                      </div>
                      <div class="user_info">
                        <span>Chat with jassa</span>
                        <p>1767 Messages</p>
                      </div>
                      <div class="video_cam">
                        <span><i class="fas fa-video"></i></span>
                        <span><i class="fas fa-phone"></i></span>
                      </div>
                    </div>
                    <span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
                    <div class="action_menu">
                      <ul>
                        <li><i class="fas fa-user-circle"></i> View profile</li>
                        <li><i class="fas fa-users"></i> Add to close friends</li>
                        <li><i class="fas fa-plus"></i> Add to group</li>
                        <li><i class="fas fa-ban"></i> Block</li>
                      </ul>
                    </div>
                  </div>
                  <div class="card-body msg_card_body">
                    <div class="d-flex justify-content-start mb-4">
                      <div class="img_cont_msg">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="rounded-circle user_img_msg" />
                      </div>
                      <div class="msg_cotainer">
                        Hi, how are you samim?
                        <span class="msg_time">8:40 AM, Today</span>
                      </div>
                    </div>
                    <div class="d-flex justify-content-end mb-4">
                      <div class="msg_cotainer_send">
                        Hi jassa i am good tnx how about you?
                        <span class="msg_time_send">8:55 AM, Today</span>
                      </div>
                      <div class="img_cont_msg">
                    <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="rounded-circle user_img_msg" />
                      </div>
                    </div>
                    <div class="d-flex justify-content-start mb-4">
                      <div class="img_cont_msg">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="rounded-circle user_img_msg" />
                      </div>
                      <div class="msg_cotainer">
                        I am good too, thank you for your chat template
                        <span class="msg_time">9:00 AM, Today</span>
                      </div>
                    </div>
                    <div class="d-flex justify-content-end mb-4">
                      <div class="msg_cotainer_send">
                        You are welcome
                        <span class="msg_time_send">9:05 AM, Today</span>
                      </div>
                      <div class="img_cont_msg">
                    <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="rounded-circle user_img_msg" />
                      </div>
                    </div>
                    <div class="d-flex justify-content-start mb-4">
                      <div class="img_cont_msg">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="rounded-circle user_img_msg" />
                      </div>
                      <div class="msg_cotainer">
                        I am looking for your next templates
                        <span class="msg_time">9:07 AM, Today</span>
                      </div>
                    </div>
                    <div class="d-flex justify-content-end mb-4">
                      <div class="msg_cotainer_send">
                        Ok, thank you have a good day
                        <span class="msg_time_send">9:10 AM, Today</span>
                      </div>
                      <div class="img_cont_msg">
                  <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="rounded-circle user_img_msg" />
                      </div>
                    </div>
                    <div class="d-flex justify-content-start mb-4">
                      <div class="img_cont_msg">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" class="rounded-circle user_img_msg" />
                      </div>
                      <div class="msg_cotainer">
                        Bye, see you
                        <span class="msg_time">9:12 AM, Today</span>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="input-group">
                      <div class="input-group-append">
                        <span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
                      </div>
                      <textarea name="" class="form-control type_msg" placeholder="Type your message..."></textarea>
                      <div class="input-group-append">
                        <span class="input-group-text send_btn"><i class="fas fa-location-arrow"></i></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     
      
)
};
}

export default Home;