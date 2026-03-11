 type ReviewUser = {
  _id: string;
  firstName: string;
  lastName: string;
  photo: string;
};


 type Testimonial = {
  _id: string;
  user: ReviewUser;
  rating: number;
  content: string;
  status: "approved" | "pending" | "rejected";
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Testimonials = {
    testimonials:Testimonial[]
}