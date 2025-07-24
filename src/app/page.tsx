"use client"

import * as React from "react"
import { Shield, Menu, X, ChevronDown, Search, Bell, User, Users, Github, Code, BookOpen, Award, Star, Twitter, Linkedin, Mail, Calendar, Briefcase, Globe, ArrowRight, Play, Download, ExternalLink, TrendingUp, Zap, Target, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Navbar Component
function CyberHubNavbar() {
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const resources = [
        { title: "Free Courses", description: "Access hundreds of cybersecurity courses", href: "/courses" },
        { title: "Learning Paths", description: "Structured cybersecurity curricula", href: "/paths" },
        { title: "Hands-on Labs", description: "Practice in virtual environments", href: "/labs" },
        { title: "Certification Prep", description: "Prepare for industry certifications", href: "/certifications" }
    ]

    const events = [
        { title: "Webinars", description: "Live cybersecurity sessions", href: "/webinars" },
        { title: "Hackathons", description: "Compete and learn together", href: "/hackathons" },
        { title: "Workshops", description: "Hands-on learning experiences", href: "/workshops" },
        { title: "Community Meetups", description: "Local cybersecurity gatherings", href: "/meetups" }
    ]

    return (
        <header className={`sticky top-0 z-50 w-full border-b border-gray-800 transition-all duration-300 ${
            isScrolled
                ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-orange-500/5'
                : 'bg-black/90 backdrop-blur-sm'
        }`}>
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <div className="relative group">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all duration-300">
                            <Shield className="h-6 w-6 text-black" />
                        </div>
                        <div className="absolute inset-0 bg-orange-500/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300 -z-10"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-white tracking-tight">TheCyberHUB</span>
                        <span className="text-xs text-orange-400 font-medium -mt-1">Security Community</span>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList className="space-x-2">
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 data-[state=open]:bg-gray-800/50 data-[state=open]:text-orange-400 transition-all duration-200">
                                Resources
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="grid gap-3 p-6 w-[500px] bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-lg">
                                    {resources.map((resource) => (
                                        <NavigationMenuLink key={resource.title} asChild>
                                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-800/50 hover:text-orange-400" href={resource.href}>
                                                <div className="text-sm font-medium leading-none text-white">{resource.title}</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-gray-400">{resource.description}</p>
                                            </a>
                                        </NavigationMenuLink>
                                    ))}
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 data-[state=open]:bg-gray-800/50 data-[state=open]:text-orange-400 transition-all duration-200">
                                Events
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="grid gap-3 p-6 w-[400px] bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-lg">
                                    {events.map((event) => (
                                        <NavigationMenuLink key={event.title} asChild>
                                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-800/50 hover:text-orange-400" href={event.href}>
                                                <div className="text-sm font-medium leading-none text-white">{event.title}</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-gray-400">{event.description}</p>
                                            </a>
                                        </NavigationMenuLink>
                                    ))}
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 transition-all duration-200" href="/internships">
                                Internships
                                <Badge className="ml-2 bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">New</Badge>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Search Bar */}
                <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search courses, topics..." className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-200" />
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-3">
                    <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 transition-all duration-200">
                        <Bell className="h-5 w-5" />
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-orange-500 rounded-full animate-pulse"></div>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 transition-all duration-200">
                                <User className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-gray-900/95 backdrop-blur-md border-gray-800" align="end">
                            <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-800" />
                            <DropdownMenuItem className="text-gray-300 hover:text-orange-400 hover:bg-gray-800/50">Profile</DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-300 hover:text-orange-400 hover:bg-gray-800/50">Settings</DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-300 hover:text-orange-400 hover:bg-gray-800/50">My Courses</DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-800" />
                            <DropdownMenuItem className="text-gray-300 hover:text-orange-400 hover:bg-gray-800/50">Sign out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105">
                        Dashboard
                    </Button>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 transition-all duration-200">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] bg-gray-900/95 backdrop-blur-md border-gray-800">
                            <div className="flex flex-col space-y-4 mt-8">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input placeholder="Search..." className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400" />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-orange-400 font-semibold text-sm uppercase tracking-wide">Resources</div>
                                    {resources.map((resource) => (
                                        <a key={resource.title} href={resource.href} className="block py-2 px-3 text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 rounded-md transition-all duration-200">
                                            {resource.title}
                                        </a>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    <div className="text-orange-400 font-semibold text-sm uppercase tracking-wide">Events</div>
                                    {events.map((event) => (
                                        <a key={event.title} href={event.href} className="block py-2 px-3 text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 rounded-md transition-all duration-200">
                                            {event.title}
                                        </a>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-gray-800">
                                    <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold">
                                        Dashboard
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

// Footer Component
function CyberHubFooter() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-5 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-orange-500/25">
                                <Shield className="h-6 w-6 text-black" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-white">TheCyberHUB</span>
                                <span className="text-sm text-orange-400 -mt-1">Security Community</span>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                            Empowering the next generation of cybersecurity professionals through education,
                            community, and hands-on experience. Join 150,000+ members worldwide.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { icon: Github, href: "https://github.com/thecyberhub" },
                                { icon: Twitter, href: "https://twitter.com/thecyberhub" },
                                { icon: Linkedin, href: "https://linkedin.com/company/thecyberhub" },
                                { icon: Mail, href: "mailto:contact@thecyberhub.org" }
                            ].map(({ icon: Icon, href }, index) => (
                                <a key={index} href={href} className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 group">
                                    <Icon className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors duration-300" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6 text-lg">Learn</h4>
                        <ul className="space-y-3">
                            {["Free Courses", "Learning Paths", "Hands-on Labs", "Certification Prep", "CTF Challenges"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group">
                                        <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6 text-lg">Community</h4>
                        <ul className="space-y-3">
                            {["Discord Server", "Forums", "Events", "Hackathons", "Mentorship"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group">
                                        <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6 text-lg">Opportunities</h4>
                        <ul className="space-y-3">
                            {["Internships", "Job Board", "Open Source", "Partnerships", "Contact Us"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group">
                                        <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 mb-4 md:mb-0">
                            &copy; 2025 TheCyberHUB. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            {["Privacy Policy", "Terms of Service", "Code of Conduct"].map((item) => (
                                <a key={item} href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm">
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

// Main Homepage Component
export default function CyberHubHomepage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <CyberHubNavbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-600/5"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>

                <div className="relative container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div className="space-y-8">
                            <div className="flex items-center space-x-2">
                                <Shield className="h-6 w-6 text-orange-400" />
                                <Badge variant="outline" className="border-orange-500/30 text-orange-400 bg-orange-500/10">
                                    Security Community
                                </Badge>
                            </div>

                            <div className="space-y-6">
                                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                                    Empowering the Next Generation of
                                    <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"> Cybersecurity Experts</span>
                                </h1>
                                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                                    Welcome to TheCyberHUB, the ultimate destination for cybersecurity enthusiasts to learn,
                                    connect, and grow together in a thriving community of 150,000+ professionals.
                                </p>
                            </div>


                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105">
                                    <Users className="mr-2 h-5 w-5" />
                                    Join our Community
                                </Button>
                                <Button size="lg" variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black transition-all duration-300">
                                    <Github className="mr-2 h-5 w-5" />
                                    Contribute to Open Source
                                </Button>
                            </div>
                        </div>

                        {/* Visual Element */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative">
                                <div className="w-96 h-96 rounded-full bg-gradient-to-br from-orange-500/10 to-orange-600/20 border-2 border-orange-400/40 shadow-2xl shadow-orange-500/20 flex items-center justify-center relative overflow-hidden">
                                    <div className="w-72 h-72 rounded-full bg-gradient-to-br from-orange-500/5 to-orange-600/10 border-2 border-orange-400/60 flex items-center justify-center">
                                        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 shadow-lg shadow-orange-500/30 flex items-center justify-center">
                                            <Shield className="h-24 w-24 text-orange-400 drop-shadow-lg" />
                                        </div>
                                    </div>

                                    {/* Floating Elements */}
                                    {[
                                        { icon: Code, position: "top-8 right-8", rotation: "rotate-12", size: "12" },
                                        { icon: Users, position: "bottom-12 left-8", rotation: "-rotate-12", size: "12" },
                                        { icon: BookOpen, position: "top-1/2 right-4", rotation: "rotate-6", size: "10" },
                                        { icon: Award, position: "top-1/3 left-4", rotation: "-rotate-6", size: "10" }
                                    ].map(({ icon: Icon, position, rotation, size }, index) => (
                                        <div key={index} className={`absolute ${position} w-${size} h-${size} bg-orange-500 rounded-lg flex items-center justify-center border border-orange-400 shadow-lg transform ${rotation} animate-pulse`}>
                                            <Icon className={`h-${parseInt(size) * 0.5} w-${parseInt(size) * 0.5} text-black`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-900/50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: "150K+", label: "Community Members", icon: Users },
                            { number: "500+", label: "Free Courses", icon: BookOpen },
                            { number: "1000+", label: "Open Source Projects", icon: Github },
                            { number: "50+", label: "Industry Partners", icon: Award }
                        ].map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <Card key={index} className="bg-gray-800/50 border-gray-700 text-center group hover:border-orange-500/50 transition-all duration-300">
                                    <CardContent className="pt-6">
                                        <div className="mb-4 flex justify-center">
                                            <div className="w-16 h-16 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                                                <IconComponent className="h-8 w-8 text-orange-400" />
                                            </div>
                                        </div>
                                        <div className="text-4xl font-bold text-orange-400 mb-2">{stat.number}</div>
                                        <div className="text-gray-300">{stat.label}</div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Why Choose TheCyberHUB?</h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Join the world's largest cybersecurity community and accelerate your career with our comprehensive platform.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: BookOpen, title: "Free Learning Resources", description: "Access hundreds of free cybersecurity courses, tutorials, and structured learning paths designed by industry experts." },
                            { icon: Users, title: "Global Community", description: "Connect with 150,000+ cybersecurity professionals, beginners, and industry experts from around the world." },
                            { icon: Github, title: "Open Source Projects", description: "Contribute to real-world cybersecurity tools and build your portfolio while making an impact." },
                            { icon: Calendar, title: "Events & Workshops", description: "Attend webinars, hackathons, and hands-on workshops led by industry professionals and thought leaders." },
                            { icon: Briefcase, title: "Internship Programs", description: "Get practical experience through our industry partnership internship programs with leading companies." },
                            { icon: Award, title: "Certification Prep", description: "Prepare for industry certifications with our comprehensive study materials and practice exams." }
                        ].map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-orange-400/50 transition-all duration-300 group">
                                    <CardHeader>
                                        <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <IconComponent className="h-8 w-8 text-orange-400" />
                                        </div>
                                        <CardTitle className="text-white">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/5"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent"></div>

                {/* Floating Background Elements */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-orange-500/15 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-orange-500/8 rounded-full blur-xl"></div>

                <div className="relative container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white">Ready to Start Your Cybersecurity Journey?</h2>
                        <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                            Join our community today and get access to free resources, mentorship, and career opportunities that will transform your future.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-bold text-xl px-10 py-6 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105">
                                <Star className="mr-3 h-6 w-6" />
                                Join Community
                            </Button>
                            <Button size="lg" variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black font-bold text-xl px-10 py-6 transition-all duration-300">
                                <Play className="mr-3 h-6 w-6" />
                                Browse Courses
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Updates Section */}
            <section className="py-24 bg-gray-900/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Latest Updates</h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Stay up to date with the latest courses, events, and community highlights.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                type: "Course",
                                title: "Advanced Penetration Testing",
                                description: "Master advanced penetration testing techniques with hands-on labs and real-world scenarios.",
                                date: "Jan 15, 2025",
                                tag: "New",
                                icon: Target
                            },
                            {
                                type: "Event",
                                title: "Cybersecurity Career Fair",
                                description: "Connect with top employers and explore career opportunities in cybersecurity.",
                                date: "Jan 20, 2025",
                                tag: "Upcoming",
                                icon: Briefcase
                            },
                            {
                                type: "Workshop",
                                title: "AI in Cybersecurity",
                                description: "Learn how artificial intelligence is transforming cybersecurity defense strategies.",
                                date: "Jan 25, 2025",
                                tag: "Popular",
                                icon: Zap
                            }
                        ].map((update, index) => {
                            const IconComponent = update.icon;
                            return (
                                <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-orange-400/50 transition-all duration-300 group cursor-pointer">
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge variant="outline" className="border-orange-500/30 text-orange-400 bg-orange-500/10">
                                                {update.type}
                                            </Badge>
                                            <Badge className={`${
                                                update.tag === 'New' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                                    update.tag === 'Upcoming' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                                        'bg-purple-500/20 text-purple-400 border-purple-500/30'
                                            }`}>
                                                {update.tag}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                                                <IconComponent className="h-5 w-5 text-orange-400" />
                                            </div>
                                            <CardTitle className="text-white group-hover:text-orange-400 transition-colors">
                                                {update.title}
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-gray-300 mb-4">
                                            {update.description}
                                        </CardDescription>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-400">{update.date}</span>
                                            <ArrowRight className="h-4 w-4 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12">
                        <Button variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black">
                            View All Updates
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Community Testimonials */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">What Our Community Says</h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Hear from cybersecurity professionals who have grown their careers with TheCyberHUB.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah Chen",
                                role: "Security Analyst at Microsoft",
                                content: "TheCyberHUB's courses helped me transition from web development to cybersecurity. The community support was incredible!",
                                rating: 5
                            },
                            {
                                name: "Marcus Rodriguez",
                                role: "Penetration Tester",
                                content: "The hands-on labs and real-world projects gave me the practical experience I needed to land my dream job.",
                                rating: 5
                            },
                            {
                                name: "Aisha Patel",
                                role: "Cybersecurity Student",
                                content: "Amazing community! The mentorship program connected me with industry professionals who guided my learning journey.",
                                rating: 5
                            }
                        ].map((testimonial, index) => (
                            <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-orange-400/50 transition-all duration-300">
                                <CardHeader>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                                            <span className="text-black font-bold">{testimonial.name.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <CardTitle className="text-white text-lg">{testimonial.name}</CardTitle>
                                            <CardDescription className="text-orange-400">{testimonial.role}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                                    <div className="flex space-x-1">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 text-orange-400 fill-current" />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-16 bg-gradient-to-r from-orange-500/10 to-orange-600/5">
                <div className="container mx-auto px-4">
                    <Card className="bg-gray-900/80 border-gray-800 max-w-4xl mx-auto">
                        <CardContent className="p-8 text-center">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
                                <p className="text-gray-300">
                                    Get the latest cybersecurity news, course updates, and community highlights delivered to your inbox.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <Input
                                    placeholder="Enter your email"
                                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20"
                                />
                                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold whitespace-nowrap">
                                    Subscribe
                                </Button>
                            </div>
                            <p className="text-xs text-gray-400 mt-4">
                                No spam, unsubscribe at any time. We respect your privacy.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <CyberHubFooter />
        </div>
    )
}
