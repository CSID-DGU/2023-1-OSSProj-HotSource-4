import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // 필수 필드로 설정
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
}, 
{ 
  timestamps: true,  //시간 자동 추가
});
 
export const Message = mongoose.model('Message', MessageSchema);
