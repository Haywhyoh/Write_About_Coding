from flask import Flask, jsonify, request
from models import db, Post, User

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///blog.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/posts', methods=['GET'])
def get_posts():
  posts = Post.query.all()
  return jsonify([post.to_dict() for post in posts])

@app.route('/posts/<int:id>', methods=['GET'])
def get_post(id):
  post = Post.query.get_or_404(id)
  return jsonify(post.to_dict())

@app.route('/post/new', methods=['POST'])
def create_post():
  data = request.json
  post = Post(title=data['title'], content=data["content"], author_id=data["author_id"])
  db.session.add(post)
  db.session.commit()
  return jsonify(post.to_dict()), 201

@app.route("/posts/<int:id>/edit", methods=["PUT"])
def update_post(id):
    data = request.json
    post = Post.query.get_or_404(id)
    post.title = data.get("title", post.title)
    post.content = data.get("content", post.content)
    db.session.commit()
    return jsonify(post.to_dict())

@app.route("/post/<int:id>/delete", methods=['DELETE'])
def delete_post(id):
  post = Post.get_or_404(id)
  db.session.delete(post)
  db.session.commit()
  return "204"

if __name__ == "__main__":
  user = User(username='test', password='12345')
  with app.app_context():
    db.session.add(user)
    db.session.commit()
  app.run(debug=True)
