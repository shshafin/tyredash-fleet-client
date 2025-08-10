"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetRecentUpdatesQuery } from "@/redux/features/newsAndUpdates/newsAndUpdatesApi";
import { ChevronLeft, ChevronRight, ExternalLink, Newspaper, Shield, Star, Truck } from "lucide-react";
import { useState } from "react";

interface NewsItem {
  _id: string;
  id: string;
  badge: string;
  title: string;
  description: string;
  status: "featured" | "recent";
}

interface NewsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: NewsItem[];
}

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6;

  const { data: newsData, isLoading: newsDataLoading } = useGetRecentUpdatesQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  console.log(newsData);

  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case "achievement":
      case "milestone":
        return "bg-yellow-100 text-yellow-800";
      case "service update":
      case "update":
        return "bg-blue-100 text-blue-800";
      case "launch":
      case "new release":
        return "bg-green-100 text-green-800";
      case "special update":
        return "bg-purple-100 text-purple-800";
      case "announcement":
        return "bg-orange-100 text-orange-800";
      case "breaking news":
        return "bg-red-100 text-red-800";
      case "event":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge.toLowerCase()) {
      case "achievement":
      case "milestone":
        return <Star className="h-4 w-4" />;
      case "service update":
      case "update":
        return <Truck className="h-4 w-4" />;
      case "launch":
      case "new release":
        return <ExternalLink className="h-4 w-4" />;
      case "special update":
        return <Shield className="h-4 w-4" />;
      case "announcement":
      case "breaking news":
        return <Newspaper className="h-4 w-4" />;
      default:
        return <Newspaper className="h-4 w-4" />;
    }
  };

  if (newsDataLoading) {
    return (
      <div className="p-4 lg:p-8 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-48"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!newsData?.success || !newsData?.data) {
    return (
      <div className="p-4 lg:p-8 space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">News & Updates</h1>
          <p className="text-gray-600">Stay informed about the latest fleet services and company updates</p>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">No news available at the moment.</p>
        </div>
      </div>
    );
  }

  const featuredNews = newsData.data.filter((item: NewsItem) => item.status === "featured");
  const regularNews = newsData.data.filter((item: NewsItem) => item.status === "recent");
  const totalPages = Math.ceil(newsData.meta.total / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleReadMore = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">News & Updates</h1>
        <p className="text-gray-600">Stay informed about the latest fleet services and company updates</p>
      </div>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Featured News</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredNews.map((item: NewsItem) => (
              <Card key={item.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getBadgeColor(item.badge)}>
                          {getBadgeIcon(item.badge)}
                          <span className="ml-1">{item.badge}</span>
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {item.description.length > 100 ? item.description.slice(0, 100) + "..." : item.description}
                  </p>
                  <Button variant="outline" size="sm" onClick={() => handleReadMore(item)}>
                    Read More
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular News */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Recent Updates</h2>
        <div className="space-y-4">
          {regularNews.map((item: NewsItem) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={getBadgeColor(item.badge)}>
                        {getBadgeIcon(item.badge)}
                        <span className="ml-1">{item.badge}</span>
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 bg-transparent"
                    onClick={() => handleReadMore(item)}
                  >
                    Read More
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing page {currentPage} of {totalPages} ({newsData.meta.total} total items)
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
              {totalPages > 5 && (
                <>
                  <span className="text-gray-500">...</span>
                  <Button
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 p-0"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      {/* <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <Newspaper className="mx-auto h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter to receive the latest fleet service updates and promotions.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">Subscribe to Newsletter</Button>
          </div>
        </CardContent>
      </Card> */}

      {/* News Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              {selectedNews && (
                <Badge className={getBadgeColor(selectedNews.badge)}>
                  {getBadgeIcon(selectedNews.badge)}
                  <span className="ml-1">{selectedNews.badge}</span>
                </Badge>
              )}
            </div>
            <DialogTitle className="text-xl font-bold text-left">{selectedNews?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <DialogDescription className="text-base text-gray-700 mb-4">Full Details</DialogDescription>
            <ScrollArea className="h-[400px] pr-4">
              <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">{selectedNews?.description}</div>
            </ScrollArea>
          </div>
          <div className="flex justify-end mt-6">
            <Button variant="outline" onClick={handleCloseModal}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
