import React from 'react';
import { BarChart, PieChart, Share2, Clock, Users, Activity, LineChart, TrendingUp, Brain,Heart,Lightbulb,ArrowRight, Target } from 'lucide-react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Header = () => (
  <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Socializing App Survey Analysis</h1>
      <p className="text-xl">Comprehensive Analysis of Social Media Usage Patterns in 2025</p>
    </div>
  </header>
);

const Introduction = () => (
  <section className="py-12 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">Introduction</h2>
      <p className="text-gray-600 leading-relaxed max-w-4xl">
        In the digital age, socializing apps have become an essential part of how people connect, communicate, and share experiences. 
        This analysis provides valuable insights into user engagement, platform popularity, and behavioral patterns across different age groups and usage scenarios.
      </p>
    </div>
  </section>
);

const KeyMetrics = () => (
  <section className="py-12 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Key Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={<Users className="w-8 h-8 text-purple-500" />}
          title="Average Age"
          value="20.8 years"
          description="Predominantly Gen Z and young millennials"
        />
        <MetricCard
          icon={<Share2 className="w-8 h-8 text-blue-500" />}
          title="Platform Distribution"
          value="76%"
          description="Use social media platforms primarily"
        />
        <MetricCard
          icon={<Clock className="w-8 h-8 text-green-500" />}
          title="Daily Usage"
          value="65%"
          description="Spend 1-3 hours daily on apps"
        />
        <MetricCard
          icon={<Activity className="w-8 h-8 text-red-500" />}
          title="Long-term Users"
          value="40%"
          description="Using platforms for 5+ years"
        />
      </div>
    </div>
  </section>
);

const MetricCard = ({ icon, title, value, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="ml-3 text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-2xl font-bold text-gray-800 mb-2">{value}</p>
    <p className="text-gray-600">{description}</p>
  </div>
);

const DataAnalysis = () => {
  const ageData = {
    labels: ['16-20', '21-25', '26-30', '31-35', '36+'],
    datasets: [{
      label: 'Age Distribution',
      data: [45, 30, 15, 5, 5],
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
      borderColor: 'rgb(99, 102, 241)',
      borderWidth: 1,
    }]
  };

  const platformData = {
    labels: ['Social Media', 'Professional', 'Content Creation', 'Gaming', 'Event Planning'],
    datasets: [{
      data: [76, 12, 8, 3, 1],
      backgroundColor: [
        'rgba(99, 102, 241, 0.7)',
        'rgba(59, 130, 246, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(239, 68, 68, 0.7)',
      ],
    }]
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Detailed Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Age Distribution</h3>
            <Bar data={ageData} options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: 'User Age Distribution'
                }
              }
            }} />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Platform Usage Distribution</h3>
            <Pie data={platformData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                }
              }
            }} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <AnalysisCard
            title="Age Distribution"
            imageSrc="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            description="The age distribution shows a strong concentration in the 18-25 year range, with a mean age of 20.8 years. This indicates that our sample primarily consists of Gen Z and young millennials, who are typically early adopters of social platforms."
          />
          
          <AnalysisCard
            title="Platform Usage Distribution"
            imageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            description="Social Media Platforms dominate with 76% of users, followed by Professional Networking (12%), Content Creation (8%), and Gaming (4%). This shows a clear preference for general social networking over specialized platforms."
          />
          
          <AnalysisCard
            title="Daily Usage Patterns"
            imageSrc="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            description="The majority of users (65%) spend 1-3 hours daily on social apps, while 25% spend 4-6 hours, and 10% spend more than 7 hours. This suggests a moderate to heavy engagement pattern among users."
          />
          
          <AnalysisCard
            title="Platform Loyalty"
            imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            description="A significant portion of users (40%) have been using their preferred platforms for 5+ years, indicating strong platform loyalty and established usage patterns."
          />
        </div>
      </div>
    </section>
  );
};

const AnalysisCard = ({ title, imageSrc, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <img 
        src={imageSrc}
        alt={title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <div className="flex items-center">
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const Correlations = () => (
  <section className="py-12 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Key Correlations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CorrelationCard
          icon={<LineChart className="w-6 h-6 text-purple-500" />}
          title="Age vs Platform Choice"
          content="Younger users (18-22) show strong preference for visual platforms like Instagram, while users 25+ tend towards professional networking apps."
        />
        <CorrelationCard
          icon={<TrendingUp className="w-6 h-6 text-blue-500" />}
          title="Usage Time vs Platform Type"
          content="Content creators and gamers show higher daily usage (4+ hours) compared to general social media users."
        />
        <CorrelationCard
          icon={<Brain className="w-6 h-6 text-green-500" />}
          title="Experience vs Engagement"
          content="Long-term users (5+ years) demonstrate more diverse platform usage and higher daily engagement."
        />
        <CorrelationCard
          icon={<Target className="w-6 h-6 text-red-500" />}
          title="Platform Purpose"
          content="Professional networking apps show higher usage during work hours, while entertainment-focused platforms peak during evenings."
        />
        <CorrelationCard
          icon={<Share2 className="w-6 h-6 text-indigo-500" />}
          title="Multi-Platform Usage"
          content="Users of professional networking apps are more likely to use multiple platforms for different purposes."
        />
        <CorrelationCard
          icon={<Activity className="w-6 h-6 text-pink-500" />}
          title="Engagement Patterns"
          content="Higher engagement correlates with content creation and community participation rather than passive consumption."
        />
      </div>
    </div>
  </section>
);

const CorrelationCard = ({ icon, title, content }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="ml-3 text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600">{content}</p>
  </div>
);

const Conclusion = () => (
  <section className="py-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">Key Takeaways</h2>
      <div className="max-w-3xl mx-auto">
        <p className="text-lg mb-4">
          Our analysis reveals a strong preference for visual-first social platforms among young adults,
          with moderate daily usage patterns dominating the landscape.
        </p>
        <p className="text-lg mb-4">
          While entertainment remains the primary driver of social app usage,
          there's a growing trend towards professional networking and content creation,
          suggesting an evolution in how these platforms are being utilized.
        </p>
        <p className="text-lg">
          The data indicates a mature social media ecosystem where users are becoming more purposeful
          in their engagement, balancing entertainment with professional growth opportunities.
        </p>
      </div>
    </div>
  </section>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Introduction />
      <KeyMetrics />
      <DataAnalysis />
      <Correlations />
      <Conclusion />
    </div>
  );
}
export default App;